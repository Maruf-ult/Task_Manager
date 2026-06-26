const UserCard = ({ userInfo }) => {
  return (
    <div className="user-card">
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={userInfo?.profileImageUrl}
          alt={`${userInfo?.name || "User"} avatar`}
          className="w-12 h-12 rounded-full border-2 border-white shrink-0 object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate">{userInfo?.name}</p>
          <p className="text-xs text-gray-500 truncate">{userInfo?.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-5">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />
        <StatCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="In Progress"
        />
        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="Completed"
        />
      </div>
    </div>
  );
};

export default UserCard;

const StatCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-gray-50";
      case "Completed":
        return "text-indigo-500 bg-gray-50";
      default:
        return "text-violet-500 bg-gray-50";
    }
  };

  return (
    <div
      className={`text-center text-[10px] sm:text-[11px] font-medium ${getStatusTagColor()} px-2 sm:px-4 py-2 rounded`}
    >
      <span className="text-[12px] sm:text-sm font-semibold block">{count}</span>
      <span className="truncate block">{label}</span>
    </div>
  );
};
