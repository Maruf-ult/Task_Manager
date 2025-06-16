import Task from "../models/Task.js";

export const getTasks = async (req,res) =>{
     try {
          const { status } = req.query;

          let filter = {};

          if(status){
               filter.status = status;
          }
          let tasks;

          if(req.user.role === "admin"){
               tasks = await Task.find(filter).populate(
                    "assignedTo",
                    "name email profileImageUrl"
               );
          }else{
               tasks = await Task.find({...filter,assignedTo:req.user._id}).populate(
                    "assignedTo",
                    "name email profileImageUrl"
               );

          }

          tasks = await Promise.all(
               tasks.map( async (task) =>{
                    const completedCount = task.todoCheckList.filter(
                         (item) => item.completed
                    ).length;
                    return {...task._doc,completedTodoCount : completedCount};
               })
          );

          const allTasks = await Task.countDocuments(
               req.user.role === "admin" ? {} : {assignedTo: req.user._id}
          );

          const pendingTasks = await Task.countDocuments({
               ...filter,
               status:"pending",
               ...(req.user.role !== "admin" && {assignedTo:req.user._id}),
          });
          
          
          const inProgressTasks = await Task.countDocuments({
               ...filter,
               status:"In Progress",
               ...(req.user.role !== "admin" && {assignedTo:req.user._id}),
          });

          
          const completedTasks = await Task.countDocuments({
               ...filter,
               status:"Completed",
               ...(req.user.role !== "admin" && {assignedTo:req.user._id}),
          });


          return res.status(200).json({tasks,
               statusSummary:{
                    all: allTasks,
                    pendingTasks,
                    inProgressTasks,
                    completedTasks,
               }
          })
          
     } catch (error) {
          return res.status(500).json({message:"Server error",error:error.message})
     }
}

export const getTaskById = async (req,res) =>{
     try {
          const task = await Task.findById(req.params.id).populate(
               "assignedTo",
               "name email profileImageUrl"
          )

          if(!task)
                return res.status(404).json({message:"Task not found"});

          return res.status(200).json(task);
          
     } catch (error) {
          return res.status(500).json({message:"Server error",error:error.message})
     }
}


export const createTask = async (req,res) =>{
     try {
          const {title,description,priority,dueDate,assignedTo,attachments,todoChecklist} = req.body;

          if(! Array.isArray(assignedTo)){
               return res.status(400).json({message:"AssignedTo must be an array of user"});
          }
          const task = await Task.create({
               title,
               description,
               priority,
               dueDate,
               assignedTo,
               createdBy:req.user._id,
               todoChecklist,
               attachments,
          })

          return res.status(201).json({message:"Task created successfully",task});
          
     } catch (error) {
          return res.status(500).json({message:"Server error",error:error.message})
     }
}


export const updateTask = async (req,res) =>{
     try {
          const task = await Task.findById(req.params.id);

          if(!task) 
               return res.status(404).json({message:"Task not found"});

          task.title = req.body.title || task.title;
          task.description = req.body.description || task.description;
          task.priority = req.body.priority || task.priority;
          task.dueDate = req.body.dueDate || task.dueDate;
          task.todoCheckList = req.body.todoCheckList || task.todoCheckList;
          task.attachments = req.body.attachments || task.attachments;

          if (req.body.assignedTo){
               if(!Array.isArray(req.body.assignedTo)){
                    return res.status(400).json({message:"AssignedTo must be an array of user IDs"});
               }
               task.assignedTo = req.body.assignedTo;
          }
          const updatedTask = await task.save();
          return res.status(201).json({message:"Task updated successfully",updatedTask})


     } catch (error) {
          return res.status(500).json({message:"Server error",error:error.message})
     }
}


export const deleteTask = async (req,res) =>{
     try {
          const task = await Task.findById(req.params.id);

          if(!task)
                return res.status(404).json({message:"Task not found"});
         
          await task.deleteOne();
          return res.status(200).json({message:"Task deleted successfully"});
          
     } catch (error) {
          return res.status(500).json({message:"Server error",error:error.message})
     }
}


export const updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const isAssigned = task.assignedTo.some(
            (userId) => userId.toString() === req.user._id.toString()
        );

        if (!isAssigned && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

        task.status = req.body.status || task.status;

        if (task.status === "Completed") {
            task.todoCheckList.forEach((item) => {
                item.completed = true;
            });
            task.progress = 100;
        }

        await task.save();
        console.log("Task after saving:", task);

        const updatedTask = await Task.findById(req.params.id);

        return res.status(200).json({ message: "Task status updated successfully", task: updatedTask });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


export  const updateTaskCheckList = async (req,res) =>{
     try {
          const {todoCheckList} = req.body;

          const task = await Task.findById(req.params.id);

          if(!task){
               return res.status(404).json({message:"Task not found"})
          }

          if( !task.assignedTo.includes(req.user._id) && req.user.role !== "admin"  ){
               return res.status(403).json({message:"Not Authorized to update checkList"})
          }
          task.todoCheckList = todoCheckList;

          const completedCount = task.todoCheckList.filter((item) => item.completed).length
          const totalItems = task.todoCheckList.length;

          task.progress = totalItems > 0 ? Math.round((completedCount/totalItems)*100) : 0
          if(task.progress === 100){
               task.status = "Completed";
          }else if(task.progress >0){
               task.status = "In Progress";
          }else{
               task.status = "Pending";
          }
          await task.save();

          const updatedTask = await Task.findById(req.params.id).populate(
               "assignedTo",
               "name email profileImageUrl"
          );

          return res.status(201).json({message:"Task Checlist updated ",task:updatedTask})
          
     } catch (error) {
          return res.status(500).json({message:"Server error",error:error.message})
     }
}


export const getDashboardData = async (req,res) =>{
     try {
          
     } catch (error) {
          return res.status(500).json({message:"Server error",error:error.message})
     }
}



export const getUserDashboardData = async (req,res) =>{
     try {
          
     } catch (error) {
          return res.status(500).json({message:"Server error",error:error.message})
     }
}


