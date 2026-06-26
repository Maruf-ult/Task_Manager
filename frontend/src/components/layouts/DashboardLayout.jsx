import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../context/UseContext'
import SideMenu from './SideMenu'
import Navbar from './Navbar'

const DashboardLayout = ({children,activeMenu}) => {
  const { user, pageLoading, setPageLoading } = useContext(UserContext)
  const location = useLocation();

  useEffect(() => {
    if (pageLoading) {
      setPageLoading(false);
    }
  }, [location.pathname, pageLoading, setPageLoading]);

     return (
      <div className='min-h-screen'>
                <Navbar activeMenu={activeMenu}/>
                {user && (
                     <div className='flex'>
                         <div className='hidden lg:block shrink-0'>
                              <SideMenu activeMenu={activeMenu}/>
                         </div>

                         <div className='grow w-full min-w-0 px-3 sm:px-4 md:px-5 pb-6'>{children}</div>
                     </div>
                ) }

                {pageLoading && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
                    <div className="w-14 h-14 rounded-full border-4 border-t-transparent border-white animate-spin" />
                  </div>
                )}
      </div>
  )
}

export default DashboardLayout
