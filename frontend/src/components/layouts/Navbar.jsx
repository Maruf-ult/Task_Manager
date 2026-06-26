import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

function Navbar({ activeMenu }) {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex items-center gap-4 sm:gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] px-4 sm:px-7 py-3 sticky top-0 z-50">
      <button
        className="block lg:hidden text-black p-1 -ml-1"
        aria-label={openSideMenu ? "Close menu" : "Open menu"}
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>
      <h2 className="text-base sm:text-lg font-medium text-black truncate">Task Manager</h2>

      {openSideMenu && (
        <>
          <div
            className="fixed inset-0 top-[57px] bg-slate-900/25 backdrop-blur-xs z-40 transition-opacity duration-300 lg:hidden"
            onClick={() => setOpenSideMenu(false)}
          />
          <div className="fixed top-[57px] left-0 z-50 bg-white shadow-xl border-r border-gray-200/50 animate-slide-in lg:hidden max-h-[calc(100vh-57px)] overflow-y-auto">
            <SideMenu
              activeMenu={activeMenu}
              onNavigate={() => setOpenSideMenu(false)}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
