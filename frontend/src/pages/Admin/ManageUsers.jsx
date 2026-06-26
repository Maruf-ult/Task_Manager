import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuFileSpreadsheet } from 'react-icons/lu';
import UserCard from '../../components/Cards/UserCard';
import LoadingGrid from '../../components/loading/LoadingGrid';
import UserCardSkeleton from '../../components/loading/UserCardSkeleton';
import toast from 'react-hot-toast';

const ManageUsers = () => {

  const [alUsers, setAllUsers]= useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);

      if(response.data?.length > 0){
        setAllUsers(response.data);
      }
    } catch (error) {
       console.error("Error fetching users:",error);
       toast.error("Failed to load team members");
    } finally {
      setIsLoading(false);
    }
  };


 const handleDownloadReport = async () => {
       try {
        const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS,{
          responseType: "blob",
        })     
         
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute ("download","user_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("User report downloaded successfully");

       } catch (error) {
          console.error("Error downloading user details",error)
          toast.error("Failed to download user details. Please try again");
       }
 }





  useEffect(() => {
      getAllUsers();
  
    return () => {
    }
  }, [])
  

  
  return (
     <DashboardLayout activeMenu="Team Members">
            <div className='-mt-2 mb-10'>
              <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-3'>
                <div className='flex items-center justify-between gap-3 w-full lg:w-auto'>
                  <h2 className='text-lg sm:text-xl font-medium'>Team Members</h2>

                  <button
                    className='flex lg:hidden download-btn'
                    onClick={handleDownloadReport}
                  >
                    <LuFileSpreadsheet className='text-lg'/>
                    Download Report
                  </button>
                </div>

                <button
                  className='hidden lg:flex download-btn'
                  onClick={handleDownloadReport}
                >
                  <LuFileSpreadsheet className='text-lg'/>
                  Download Report
                </button>
              </div>

              {isLoading ? (
                <LoadingGrid SkeletonComponent={UserCardSkeleton} count={6} />
              ) : alUsers.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
                  {alUsers.map((user) => (
                    <UserCard key={user._id} userInfo={user} />
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center h-64">
                  <p className="text-gray-500 text-lg">No team members found</p>
                </div>
              )}
            </div>
     </DashboardLayout>
  )
}

export default ManageUsers