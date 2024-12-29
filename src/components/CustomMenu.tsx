import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogoutMutation } from '../features/AuthService/authenticationApi';

export default function CustomMenu({title,listItems}:any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [logout, {data, error, isLoading}] = useLogoutMutation();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = async(item:any) => {
    await handleClose()
    if(item.value === "logout"){
      await handleLogout();
      await clearCookies();
    }
  }

  const handleLogout = async() => {
    if (isLoading) {
      toast.info("Logging out...");
      return;
    }
  
    try {
      const response = await logout({});
      if (error || response?.error) {
        toast.error("Logout failed");
      } else {
        toast.success(data?.data?.message || "Logout successful");
      }
    } catch (error) {
      toast.error("An error occurred while logging out.");
      console.error("Logout failed", error);
    }
  }
  
  

  const clearCookies = async() => {
    const token = Cookies.get("token")
    if (token) {
      await Cookies.remove("token");
      await Cookies.remove("role");
      await Cookies.remove("termsAndConditions");
      await navigate("/login")
    }
  }


  return (
    <Box>
      <Box display={"flex"} sx={{fontWeight:"bold", cursor:"pointer"}} onClick={handleClick}>{title} <KeyboardArrowDownIcon/></Box>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{mt:1}}
      >
        {listItems.map((menuItem:any,index:number) => {
        return <MenuItem onClick={() => handleMenuClick(menuItem)} key={index}>{menuItem.name}</MenuItem>
        })}
      </Menu>
    </Box>
  );
}