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
      <div className=''>
                <Navbar activeMenu={activeMenu}/>
                {user && (
                     <div className='flex'>
                         <div className='max-[1080px]:hidden'>
                              <SideMenu activeMenu={activeMenu}/>
                         </div>

                         <div className='grow mx-5'>{children}</div>
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