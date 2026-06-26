import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuSquareArrowOutUpRight, LuFileText, LuImage, LuLink } from "react-icons/lu";
import { useParams } from "react-router-dom";
import AvatarGroup from "../../components/layouts/AvatarGroup";
import PageSpinner from "../../components/loading/PageSpinner";
import TaskDetailsSkeleton from "../../components/loading/TaskDetailsSkeleton";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";

function ViewTaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/20";

      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  const getTaskDetailsByID = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(id)
      );

      if (response.data) {
        const taskInfo = response.data;
        setTask(taskInfo);
      }
    } catch (error) {
      console.error("Error fetching users", error);
      toast.error("Failed to load task details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTaskDetailsByID();
  }, [id]);

const updateTodoChecklist = async (index) => {
  const todoCheckList = task?.todoCheckList?.map((item) => ({ ...item }));
  const taskId = id;

  if (todoCheckList && todoCheckList[index]) {
    const originalStatus = todoCheckList[index].completed;
    todoCheckList[index].completed = !originalStatus;

    // Determine new status based on updated checklist
    const allCompleted = todoCheckList.every(item => item.completed);
    const newStatus = allCompleted ? "Completed" : "In Progress";

    // Optimistically update UI
    setTask((prev) => ({
      ...prev,
      todoCheckList,
      status: newStatus,
    }));

    try {
      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId),
        { todoCheckList }
      );

      // Update with backend confirmation (if available)
      if (response.status === 200 && response.data?.task) {
        setTask(response.data.task);
        toast.success("Task updated successfully");
      }
    } catch (error) {
      // Revert on failure
      todoCheckList[index].completed = originalStatus;
      const allCompletedAfterRevert = todoCheckList.every(item => item.completed);
      const revertedStatus = allCompletedAfterRevert ? "Completed" : "In Progress";

      setTask((prev) => ({
        ...prev,
        todoCheckList,
        status: revertedStatus,
      }));

      toast.error("Unable to update checklist. Please try again.");
      console.error("Checklist update failed", error);
    }
  }
};

  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = "https://" + link;
    }
    window.open(link, "_blank");
  };

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="mt-5">
        {isLoading ? (
          <div className="relative">
            <div className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none min-h-96">
              <PageSpinner />
            </div>
            <div className="opacity-50">
              <TaskDetailsSkeleton />
            </div>
          </div>
        ) : task ? (
          <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
            <div className="form-card col-span-3">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <h2 className="text-sm sm:text-base md:text-xl font-medium line-clamp-2 flex-1 min-w-0">
                  {task?.title}
                </h2>

                <div
                  className={`text-[11px] md:text-[13px] font-medium shrink-0 ${getStatusTagColor(
                    task?.status
                  )} px-4 py-0.5 rounded self-start`}
                >
                  {task?.status}
                </div>
              </div>

              <div className="mt-4">
                <InfoBox label="Description" value={task?.description} />
              </div>

              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-6 md:col-span-4">
                  <InfoBox label="Priority" value={task?.priority} />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <InfoBox
                    label="Due Date"
                    value={
                      task?.dueDate
                        ? moment(task?.dueDate).format("Do MMM YYYY")
                        : "N/A"
                    }
                  />
                </div>

                <div className="col-span-6 md:col-span-4">
                  <label className="text-xs font-medium text-slate-500 ">
                    Assigned To
                  </label>

                  <AvatarGroup
                    avatars={
                      task?.assignedTo?.map((item) => item?.profileImageUrl) ||
                      []
                    }
                    maxVisible={5}
                  />
                </div>
              </div>

              <div className="mt-2">
                <label className="text-xs font-medium text-slate-500">
                  Todo Checklist
                </label>

                {task?.todoCheckList?.map((item, index) => (
                  <TodoCheckList
                    key={`todo_${index}_${item.text}_${item.completed}`}
                    text={item.text}
                    isChecked={item?.completed}
                    onChange={() => updateTodoChecklist(index)}
                  />
                ))}
              </div>
              {task?.attachments?.length > 0 && (
                <div className="mt-2">
                  <label className="text-xs font-medium text-slate-500">
                    Attachments
                  </label>
                  {task?.attachments?.map((link, index) => (
                    <Attachment
                      key={`link_${index}`}
                      link={link}
                      index={index}
                      onClick={() => handleLinkClick(link)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-96">
            <p className="text-gray-500 text-lg">Task not found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ViewTaskDetails;

const InfoBox = ({ label, value }) => {
  return (
    <>
      <label className="text-xs font-medium text-slate-500">{label}</label>

      <p className="text-[12px] md:text-[13px] font-medium text-gray-700 mt-0.5 ">
        {value}
      </p>
    </>
  );
};

const TodoCheckList = ({ text, isChecked, onChange }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded-sm outline-none transition duration-150"
      />
      <span
        className={`text-[13px] text-gray-800 ${
          isChecked ? "line-through text-gray-500" : ""
        }`}
      >
        {text}
      </span>
    </label>
  );
};
const getFileName = (url) => {
  try {
    const decodedUrl = decodeURIComponent(url);
    const parts = decodedUrl.split('/');
    const filenameWithParams = parts[parts.length - 1];
    return filenameWithParams.split('?')[0];
  } catch (error) {
    return url;
  }
};

const getFileIcon = (url) => {
  const ext = url.split('.').pop().toLowerCase().split('?')[0];
  if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext)) {
    return <LuImage className="text-blue-500 text-lg" />;
  }
  if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'zip'].includes(ext)) {
    return <LuFileText className="text-amber-500 text-lg" />;
  }
  return <LuLink className="text-indigo-500 text-lg" />;
};

const Attachment = ({ link, index, onClick }) => {
  const filename = getFileName(link);
  const icon = getFileIcon(link);

  return (
    <div
      className="flex justify-between items-center bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 px-4 py-2.5 rounded-lg mb-2.5 mt-1 cursor-pointer transition-all duration-200 hover:shadow-xs group"
      onClick={onClick}
    >
      <div className="flex-1 flex items-center gap-3 overflow-hidden">
        <span className="text-xs text-gray-400 font-semibold w-5 select-none">
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>
        <div className="flex items-center gap-2 max-w-[90%] overflow-hidden">
          {icon}
          <p className="text-xs text-gray-700 font-medium truncate group-hover:text-blue-600 transition-colors duration-200">
            {filename}
          </p>
        </div>
      </div>
      <LuSquareArrowOutUpRight className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200 shrink-0" />
    </div>
  );
};
