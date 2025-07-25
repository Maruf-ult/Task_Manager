import transporter from "../config/nodeMailer.js";
import Task from "../models/Task.js";
import User from "../models/User.js";
import { TASK_ASSIGNMENT_TEMPLATE } from "../config/emailTemplates.js";
import moment from "moment";
export const getTasks = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};

    if (status) {
      filter.status = status;
    }
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find(filter).populate(
        "assignedTo",
        "name email profileImageUrl"
      );
    } else {
      tasks = await Task.find({ ...filter, assignedTo: req.user._id }).populate(
        "assignedTo",
        "name email profileImageUrl"
      );
    }

    tasks = await Promise.all(
      tasks.map(async (task) => {
        const completedCount = task.todoCheckList.filter(
          (item) => item.completed
        ).length;
        return { ...task._doc, completedTodoCount: completedCount };
      })
    );

    const allTasks = await Task.countDocuments(
      req.user.role === "admin" ? {} : { assignedTo: req.user._id }
    );

    const pendingTasks = await Task.countDocuments({
      ...filter,
      status: "Pending",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    const inProgressTasks = await Task.countDocuments({
      ...filter,
      status: "In Progress",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    const completedTasks = await Task.countDocuments({
      ...filter,
      status: "Completed",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    return res.status(200).json({
      tasks,
      statusSummary: {
        all: allTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImageUrl"
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json(task);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      attachments,
      todoCheckList,
    } = req.body;

    if (!Array.isArray(assignedTo) || assignedTo.length === 0) {
      return res
        .status(400)
        .json({ message: "assignedTo must be a non-empty array of user IDs" });
    }

    // Create task
    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      createdBy: req.user._id,
      todoCheckList,
      attachments,
    });


    const assignedByUser = await User.findById(req.user._id);
    const assignedByName = assignedByUser?.name || "Someone";


    const assignedUsers = await User.find({ _id: { $in: assignedTo } });

    for (const user of assignedUsers) {
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: "You have been assigned a new task",
        html: TASK_ASSIGNMENT_TEMPLATE
          .replace('{{userName}}', user.name)
          .replace('{{assignedBy}}', assignedByName)
          .replace('{{taskName}}', task.title)
          .replace('{{dueDate}}',  moment(task.dueDate).format("MMM DD, YYYY"))
          .replace('{{taskLink}}', `http://localhost:5173/user/task-details/${task._id}`),
      };

      await transporter.sendMail(mailOptions);
    }

    return res
      .status(201)
      .json({ message: "Task created and users notified", task });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};


export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update fields
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.todoCheckList = req.body.todoCheckList || task.todoCheckList;
    task.attachments = req.body.attachments || task.attachments;

    // Handle assignedTo update
    if (req.body.assignedTo) {
      if (!Array.isArray(req.body.assignedTo)) {
        return res
          .status(400)
          .json({ message: "AssignedTo must be an array of user IDs" });
      }
      task.assignedTo = req.body.assignedTo;
    }

    const updatedTask = await task.save();

    const assignedByUser = await User.findById(req.user._id);
    const assignedByName = assignedByUser?.name || "Someone";

    const assignedUsers = await User.find({ _id: { $in: task.assignedTo } });

    for (const user of assignedUsers) {
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: "Task Updated Notification",
        html: TASK_ASSIGNMENT_TEMPLATE
          .replace("{{userName}}", user.name)
          .replace("{{assignedBy}}", assignedByName)
          .replace("{{taskName}}", task.title)
          .replace("{{dueDate}}", moment(task.dueDate).format("MMM DD, YYYY"))
          .replace(
            "{{taskLink}}",
            `http://localhost:5173/user/task-details/${task._id}`
          ),
      };

      await transporter.sendMail(mailOptions);
    }

    return res
      .status(200)
      .json({ message: "Task updated and notifications sent", updatedTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.deleteOne();
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

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

    return res
      .status(200)
      .json({ message: "Task status updated successfully", task: updatedTask });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const updateTaskCheckList = async (req, res) => {
  try {
    const { todoCheckList } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!task.assignedTo.includes(req.user._id) && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not Authorized to update checkList" });
    }
    task.todoCheckList = todoCheckList;

    const completedCount = task.todoCheckList.filter(
      (item) => item.completed
    ).length;
    const totalItems = task.todoCheckList.length;

    task.progress =
      totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
    if (task.progress === 100) {
      task.status = "Completed";
    } else if (task.progress > 0) {
      task.status = "In Progress";
    } else {
      task.status = "Pending";
    }
    await task.save();

    const updatedTask = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImageUrl"
    );

    return res
      .status(201)
      .json({ message: "Task Checlist updated ", task: updatedTask });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getDashboardData = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    const pendingTasks = await Task.countDocuments({ status: "pending" });
    const completedTasks = await Task.countDocuments({ status: "Completed" });
    const overdueTasks = await Task.countDocuments({
      status: { $ne: "Completed" },
      dueDate: { $lt: new Date() },
    });

    const taskStatuses = ["Pending", "In Progress", "Completed"];
    const taskDistributionRaw = await Task.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    const taskDistribution = taskStatuses.reduce((acc, status) => {
      const formattedKey = status.replace(/\s+/g, "");
      acc[formattedKey] =
        taskDistributionRaw.find((item) => item._id === status)?.count || 0;
      return acc;
    }, {});

    const taskPriorities = ["Low", "Medium", "High"];
    const taskPriorityLevelRaw = await Task.aggregate([
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);
    const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
      acc[priority] =
        taskPriorityLevelRaw.find((item) => item._id === priority)?.count || 0;
      return acc;
    }, {});
    const recentTasks = await Task.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title status priority dueDate createdAt");

    return res.status(200).json({
      statistics: {
        totalTasks,
        pendingTasks,
        completedTasks,
        overdueTasks,
      },
      charts: {
        taskDistribution,
        taskPriorityLevels,
      },
      recentTasks,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getUserDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalTasks = await Task.countDocuments({ assignedTo: userId });
    const pendingTasks = await Task.countDocuments({
      assignedTo: userId,
      status: "Pending",
    });
    const completedTasks = await Task.countDocuments({
      assignedTo: userId,
      status: "Completed",
    });
    const overdueTasks = await Task.countDocuments({
      assignedTo: userId,
      status: { $ne: "Completed" },
      dueDate: { $lt: new Date() },
    });

    const taskStatuses = ["Pending", "In Progress", "Completed"];
    const taskDistributionRaw = await Task.aggregate([
      { $match: { assignedTo: userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const taskDistribution = taskStatuses.reduce((acc, status) => {
      const formattedKey = status.replace(/\s+/g, "");
      acc[formattedKey] =
        taskDistributionRaw.find((item) => item._id === status)?.count || 0;
      return acc;
    }, {});

    taskDistribution["All"] = totalTasks;

    const taskPriorities = ["Low", "Medium", "High"];
    const taskPriorityLevelRaw = await Task.aggregate([
      { $match: { assignedTo: userId } },
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

    const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
      acc[priority] =
        taskPriorityLevelRaw.find((item) => item._id === priority)?.count || 0;
      return acc;
    }, {});

    const recentTasks = await Task.find({ assignedTo: userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title status priority dueDate createdAt");

    return res.status(200).json({
      statistics: {
        totalTasks,
        pendingTasks,
        completedTasks,
        overdueTasks,
      },
      charts: {
        taskDistribution,
        taskPriorityLevels,
      },
      recentTasks,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
