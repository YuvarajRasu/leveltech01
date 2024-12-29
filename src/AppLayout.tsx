import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './pages/components/Header'
import { Box, Grid2 } from '@mui/material'
import Sidebar from './pages/components/Sidebar'
import CustomDrawer from './components/CustomDrawer'
import Cookies from 'js-cookie'

const AppLayout = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if(token?.length){
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/login"); // Redirect to login page if not authenticated
    }
  },[navigate])
  if (!isAuthenticated) {
    return null; // Optionally return a loading spinner or nothing while checking authentication
  }
  return (
    <Box>
      <CustomDrawer/>
    </Box>
  )
}

export default AppLayout