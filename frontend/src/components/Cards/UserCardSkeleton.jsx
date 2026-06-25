const UserCardSkeleton = () => {
  return (
    <div className="user-card p-2 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white" />
          <div className="space-y-2">
            <div className="h-3.5 w-24 rounded bg-gray-200" />
            <div className="h-3 w-32 rounded bg-gray-200" />
          </div>
        </div>
      </div>

      <div className="flex items-end gap-3 mt-5">
        <div className="flex-1 h-10 rounded bg-gray-200" />
        <div className="flex-1 h-10 rounded bg-gray-200" />
        <div className="flex-1 h-10 rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default UserCardSkeleton;
