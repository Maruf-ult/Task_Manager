const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="my-2 w-full overflow-x-auto -mx-1 px-1">
      <div className="flex flex-nowrap min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`relative px-2.5 sm:px-3 md:px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap ${
              activeTab === tab.label
                ? "text-blue-500"
                : "text-gray-500 hover:text-gray-700"
            } cursor-pointer shrink-0`}
            onClick={() => setActiveTab(tab.label)}
          >
            <div className="flex items-center">
              <span>{tab.label}</span>
              <span
                className={`text-xs ml-1.5 sm:ml-2 px-1.5 sm:px-2 py-0.5 rounded-full ${
                  activeTab === tab.label
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200/70 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            </div>
            {activeTab === tab.label && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusTabs;
