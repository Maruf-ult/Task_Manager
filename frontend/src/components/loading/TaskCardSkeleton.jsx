const TaskCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl py-4 border border-gray-200 shadow-[0_2px_12px_rgba(15,23,42,0.08)] animate-pulse">
      <div className="flex items-end gap-3 px-4">
        <div className="h-5 bg-slate-200 rounded w-20" />
        <div className="h-5 bg-slate-100 rounded w-24" />
      </div>
      <div className="px-4 border-l-[3px] border-slate-200 mt-1">
        <div className="h-4 bg-slate-200 rounded w-3/4 mt-4" />
        <div className="h-3 bg-slate-100 rounded w-full mt-2" />
        <div className="h-3 bg-slate-100 rounded w-2/3 mt-1.5" />
        <div className="h-3 bg-slate-200 rounded w-1/3 mt-3 mb-2" />
        <div className="h-2 bg-slate-100 rounded w-full" />
      </div>
      <div className="px-4 mt-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-3 bg-slate-100 rounded w-14" />
            <div className="h-4 bg-slate-200 rounded w-20" />
          </div>
          <div className="space-y-1">
            <div className="h-3 bg-slate-100 rounded w-14" />
            <div className="h-4 bg-slate-200 rounded w-20" />
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 bg-slate-200 rounded-full border-2 border-white"
              />
            ))}
          </div>
          <div className="h-7 bg-slate-100 rounded-lg w-12" />
        </div>
      </div>
    </div>
  );
};

export default TaskCardSkeleton;
