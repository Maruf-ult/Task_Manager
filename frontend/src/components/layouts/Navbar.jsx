import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

function Navbar({ activeMenu }) {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex items-center gap-4 bg-white border-b border-gray-200/50 backdrop-blur-[2px] px-4 sm:px-7 py-3 sticky top-0 z-30">
      <button
        className="block lg:hidden text-black"
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
      <h2 className="text-lg font-medium text-black">Task Manager</h2>

      {openSideMenu && (
        <>
          <div 
            className="fixed inset-0 top-[61px] bg-slate-900/25 backdrop-blur-xs z-30 transition-opacity duration-300 lg:hidden"
            onClick={() => setOpenSideMenu(false)}
          />
          <div className="fixed top-[61px] left-0 z-40 bg-white shadow-xl border-r border-gray-200/50 animate-slide-in">
            <SideMenu activeMenu={activeMenu} />
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
