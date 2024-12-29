import { Box } from '@mui/material'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomDrawer from './components/CustomDrawer'

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
