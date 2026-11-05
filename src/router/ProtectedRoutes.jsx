import React, { useContext } from 'react'
import { AuthContext } from '../context/MyContext'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoutes = () => {
  const {user} = useContext(AuthContext)
   if(!user){
        return <Navigate to = "*" />
    }
  return <Outlet />
}

export default ProtectedRoutes