const TaskCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl py-4 shadow-md shadow-gray-100 border border-gray-200/50 animate-pulse">
      {/* Status / priority tags */}
      <div className="flex items-end gap-3 px-4">
        <div className="h-5 w-20 rounded bg-gray-200" />
        <div className="h-5 w-24 rounded bg-gray-200" />
      </div>

      {/* Title / description / progress */}
      <div className="px-4 border-l-[3px] border-gray-200">
        <div className="h-4 w-3/4 rounded bg-gray-200 mt-4" />
        <div className="h-3 w-full rounded bg-gray-200 mt-2.5" />
        <div className="h-3 w-2/3 rounded bg-gray-200 mt-2" />

        <div className="h-3 w-28 rounded bg-gray-200 mt-3 mb-2" />
        <div className="h-1.5 w-full rounded bg-gray-200" />
      </div>

      {/* Dates */}
      <div className="px-4">
        <div className="flex items-center justify-between my-2">
          <div className="space-y-1.5">
            <div className="h-2.5 w-14 rounded bg-gray-200" />
            <div className="h-3 w-20 rounded bg-gray-200" />
          </div>
          <div className="space-y-1.5">
            <div className="h-2.5 w-14 rounded bg-gray-200" />
            <div className="h-3 w-20 rounded bg-gray-200" />
          </div>
        </div>

        {/* Avatars / attachments */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex -space-x-2">
            <div className="h-9 w-9 rounded-full bg-gray-200 border-2 border-white" />
            <div className="h-9 w-9 rounded-full bg-gray-200 border-2 border-white" />
            <div className="h-9 w-9 rounded-full bg-gray-200 border-2 border-white" />
          </div>
          <div className="h-7 w-12 rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default TaskCardSkeleton;
