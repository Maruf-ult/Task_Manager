

import { useEffect, useState } from "react";
import { LuFileSpreadsheet } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import TaskCard from "../../components/Cards/TaskCard";
import LoadingGrid from "../../components/loading/LoadingGrid";
import TaskCardSkeleton from "../../components/loading/TaskCardSkeleton";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TaskStatusTabs from "../../components/layouts/TaskStatusTabs ";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const MyTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus,
        },
      });

      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);

      const statusSummary = response.data?.statusSummary || {};

      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary.completedTasks || 0 },
      ];

      setTabs(statusArray);
    } catch (error) {
      console.log("Error fetching users:", error);
      toast.error("Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (taskId) => {
    navigate(`/user/task-details/${taskId}`);
  };


  useEffect(() => {
    getAllTasks(filterStatus);

    return () => {};
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="My Tasks">
  <div className="-mt-2">

    {/* Header */}
    <div className="mb-6 mt-2">
      <h2 className="text-2xl font-semibold text-gray-900">
        My Tasks
      </h2>
    </div>

    {/* Status Tabs */}
    {tabs?.[0]?.count > 0 && (
      <div className="mb-6">
        <TaskStatusTabs
          tabs={tabs}
          activeTab={filterStatus}
          setActiveTab={setFilterStatus}
        />
      </div>
    )}

    {/* Tasks */}
    {isLoading ? (
      <LoadingGrid SkeletonComponent={TaskCardSkeleton} count={6} />
    ) : allTasks.length > 0 ? (
      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        }}
      >
        {allTasks.map((item) => (
          <TaskCard
            key={item._id}
            title={item.title}
            description={item.description}
            priority={item.priority}
            status={item.status}
            progress={item.progress}
            createdAt={item.createdAt}
            dueDate={item.dueDate}
            assignedTo={item.assignedTo?.map(
              (user) => user.profileImageUrl
            )}
            attachmentCount={item.attachments?.length || 0}
            completedTodoCount={item.completedTodoCount || 0}
            todoCheckList={item.todoCheckList || []}
            onClick={() => handleClick(item._id)}
          />
        ))}
      </div>
    ) : (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">
          No tasks found
        </p>
      </div>
    )}

  </div>
</DashboardLayout>
  );
};

export default MyTasks;
