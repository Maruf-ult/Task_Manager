import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/Cards/InfoCard";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TaskListTable from "../../components/layouts/TaskListTable";
import CustomBarChart from "../../components/layouts/charts/CustomBarChart";
import CustomPieChart from "../../components/layouts/charts/CustomPieChart";
import { UserContext } from "../../context/UseContext";
import { UseUserAuth } from "../../hooks/UseUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { addThousandsSeparator } from "../../utils/helper";

function Dashboard() {
  UseUserAuth();

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const COLORS = ["#8051FF", "#00BBDB", "#7BCE00"];

  const prepareChartData = (data) => {
  
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ];

    setPieChartData(taskDistributionData);

    const PriorityLevelData = [
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ];
    setBarChartData(PriorityLevelData);
  };

  const getDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );

      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSeeMore = () => {
    navigate("/admin/tasks");
  };

  useEffect(() => {
    getDashboardData();

    return () => {};
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="card -mt-5 animate-pulse">
          <div>
            <div className="col-span-3">
              <div className="h-7 bg-slate-200 rounded w-1/3"></div>
              <div className="h-4 bg-slate-100 rounded w-1/5 mt-2.5"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded shadow-xs">
                <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="h-5 bg-slate-200 rounded w-12"></div>
                  <div className="h-4 bg-slate-100 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
          <div className="card animate-pulse">
            <div className="h-5 bg-slate-200 rounded w-1/3 mb-6"></div>
            <div className="h-48 bg-slate-100 rounded-full w-48 mx-auto flex items-center justify-center">
              <div className="h-32 bg-white rounded-full w-32"></div>
            </div>
          </div>

          <div className="card animate-pulse">
            <div className="h-5 bg-slate-200 rounded w-1/3 mb-6"></div>
            <div className="flex items-end justify-between h-48 px-10 pt-4">
              <div className="h-16 bg-slate-200 rounded w-10"></div>
              <div className="h-28 bg-slate-200 rounded w-10"></div>
              <div className="h-36 bg-slate-200 rounded w-10"></div>
            </div>
          </div>

          <div className="md:col-span-2 card animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 bg-slate-200 rounded w-1/4"></div>
              <div className="h-8 bg-slate-100 rounded w-20"></div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-slate-100 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="card -mt-5">
        <div>
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl">Good Morning! {user?.name}</h2>
            <p className="text-x5 md:text-[13px] text-gray-400 mt-1.5  ">
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          <InfoCard
            label="Total Tasks"
            value={addThousandsSeparator(
              Object.values(
                dashboardData?.charts?.taskDistribution || {}
              ).reduce((sum, count) => sum + count, 0)
            )}
            color="bg-blue-500"
          />
          <InfoCard
            label="Pending Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Pending || 0
            )}
            color="bg-violet-500"
          />
          <InfoCard
            label="In Progress Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.InProgress || 0
            )}
            color="bg-cyan-500"
          />
          <InfoCard
            label="Completed Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Completed || 0
            )}
            color="bg-green-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-2 gap-6 my-4 md:my-6">
        <div>
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className="font-medium">Task Distribution</h5>
            </div>

            <CustomPieChart data={pieChartData} colors={COLORS} />
          </div>
        </div>

        <div>
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className="font-medium">Task Priority Levels</h5>
            </div>

            <CustomBarChart data={barChartData} colors={COLORS} />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className="text-lg">Recent Tasks</h5>

              <button className="card-btn" onClick={onSeeMore}>
                See ALl <LuArrowRight className="text-base" />
              </button>
            </div>
            <TaskListTable tableData={dashboardData?.recentTasks || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
