const TaskDetailsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 mt-4 animate-pulse">
      <div className="form-card col-span-3">
        <div className="flex items-center justify-between">
          <div className="h-6 bg-slate-200 rounded w-1/2 md:w-1/3" />
          <div className="h-6 bg-slate-100 rounded w-20" />
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-3 bg-slate-100 rounded w-20" />
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-100 rounded w-3/4" />
        </div>
        <div className="grid grid-cols-12 gap-4 mt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="col-span-6 md:col-span-4 space-y-2">
              <div className="h-3 bg-slate-100 rounded w-16" />
              <div className="h-4 bg-slate-200 rounded w-24" />
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-3">
          <div className="h-3 bg-slate-100 rounded w-24" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-4 h-4 bg-slate-200 rounded-sm shrink-0" />
              <div className="h-4 bg-slate-100 rounded w-full max-w-xs" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsSkeleton;
