import PageSpinner from "./PageSpinner";

const LoadingGrid = ({ SkeletonComponent, count = 6, className = "" }) => {
  return (
    <div className={`relative mt-4 ${className}`}>
      <div className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none">
        <PageSpinner />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 opacity-50">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonComponent key={i} />
        ))}
      </div>
    </div>
  );
};

export default LoadingGrid;
