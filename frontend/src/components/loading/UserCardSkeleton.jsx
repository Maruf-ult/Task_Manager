const UserCardSkeleton = () => {
  return (
    <div className="user-card animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-slate-200 rounded-full shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded w-2/3" />
          <div className="h-3 bg-slate-100 rounded w-full" />
        </div>
      </div>
      <div className="flex items-end gap-3 mt-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-1 h-12 bg-slate-100 rounded" />
        ))}
      </div>
    </div>
  );
};

export default UserCardSkeleton;
