import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UseContext";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";

const SideMenu = ({ activeMenu, onNavigate }) => {
  const { user, clearUser, setPageLoading } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }

    setPageLoading(true);
    onNavigate?.();
    navigate(route);
  };

  const handleLogout = () => {
    setPageLoading(true);
    onNavigate?.();
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
    return () => {};
  }, [user]);

  return (
    <div className="w-64 h-[calc(100vh-57px)] bg-white border-r border-gray-200/50 sticky top-[57px] z-20">
      <div className="flex flex-col items-center pt-5 pb-4 px-4 border-b border-gray-100">
        <img
          src={user?.profileImageUrl || " "}
          alt="Profile"
          className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-400 rounded-full object-cover"
        />

        {user?.role === "admin" && (
          <div className="text-[10px] font-medium text-white bg-blue-500 px-3 py-0.5 rounded mt-2">
            Admin
          </div>
        )}

        <h5 className="text-gray-950 font-medium leading-6 mt-2 text-center truncate w-full">
          {user?.name || ""}
        </h5>

        <p className="text-[12px] text-gray-500 text-center truncate w-full">
          {user?.email || ""}
        </p>
      </div>

      <nav className="py-2">
        {sideMenuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] transition-all duration-200 ease-in-out ${
              activeMenu === item.label
                ? "text-blue-600 bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3 border-blue-500 font-medium"
                : "text-gray-600 hover:text-blue-600 hover:bg-slate-50/80"
            } py-3 px-6 cursor-pointer`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl shrink-0" />
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SideMenu;
