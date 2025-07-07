import React from 'react'
import { UseUserAuth } from '../../hooks/UseUserAuth'
function UserDashboard() {
  
  UseUserAuth();
  
  return (

    <div>UserDashboard</div>
  )
}

export default UserDashboard