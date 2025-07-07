import React from 'react'
import { UserContext } from '../../context/UseContext'
import { useContext } from 'react'
import { UseUserAuth } from '../../hooks/UseUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';

function Dashboard() {
  UseUserAuth();

  const {user} = useContext(UserContext)


  






  return (

    <DashboardLayout>
           Dashboard
    </DashboardLayout>
  
  )
}

export default Dashboard