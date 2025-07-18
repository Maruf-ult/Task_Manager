import User from "../models/User.js";
import Task from "../models/Task.js";


export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" }).select("-password");

    const usersWithTaskCounts = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({ assignedTo: user._id, status: "Pending" });
        const inProgressTasks = await Task.countDocuments({ assignedTo: user._id, status: "In Progress" });
        const completedTasks = await Task.countDocuments({ assignedTo: user._id, status: "Completed" });

        return {
          ...user.toObject(),
          pendingTasks,
          inProgressTasks,
          completedTasks,
        };
      })
    );

    return res.status(200).json(usersWithTaskCounts);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getUserById = async(req,res)=>{
     try {
           
          const user = await User.findById(req.params.id).select("-password");

          if(!user){
               return res.status(404).json({message:"User not found"});
          }
          return res.json(user)

     } catch (error) {
          return res.status(500).json({message:"Server error",error})
     }
};

