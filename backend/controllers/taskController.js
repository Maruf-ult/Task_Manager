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
          return res.status(500).json({message:"Server error",error})
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
          return res.status(500).json({message:"Server error",error})
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
          return res.status(500).json({message:"Server error",error})
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
          return res.status(500).json({message:"Server error",error})
     }
}


export const deleteTask = async (req,res) =>{
     try {
          
     } catch (error) {
          return res.status(500).json({message:"Server error",error})
     }
}


export const updateTaskStatus = async (req,res) =>{
     try {
          
     } catch (error) {
          return res.status(500).json({message:"Server error",error})
     }
}


export  const updateTaskCheckList = async (req,res) =>{
     try {
          
     } catch (error) {
          return res.status(500).json({message:"Server error",error})
     }
}


export const getDashboardData = async (req,res) =>{
     try {
          
     } catch (error) {
          return res.status(500).json({message:"Server error",error})
     }
}



export const getUserDashboardData = async (req,res) =>{
     try {
          
     } catch (error) {
          return res.status(500).json({message:"Server error",error})
     }
}


