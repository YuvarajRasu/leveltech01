import GroupsIcon from '@mui/icons-material/Groups';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import StorageIcon from '@mui/icons-material/Storage';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ open }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname
  
  
  const sidebarItems = [
    { icon: <SpaceDashboardIcon />, title: "Dashboard", id: 1, value: "" },
    { icon: <ShoppingBasketIcon />, title: "Purchases", id: 2, value: "purchases" },
    { icon: <ShoppingCartIcon />, title: "Products", id: 3, value: "products" },
    { icon: <MonetizationOnIcon />, title: "Sales", id: 4, value: "sales" },
    { icon: <StorefrontIcon />, title: "Vendors", id: 5, value: "vendor" },
    { icon: <GroupsIcon />, title: "Customers", id: 6, value: "customer" },
    { icon: <StorageIcon />, title: "Stocks", id: 7, value: "stock" },
  ];

  const handleSideBarItemClick = (value: string) => {
    navigate(`/${value}`)
  };

  return (
    <List disablePadding>
      {sidebarItems.map((item) => {
        const isActive = path === `/${item.value}`;
       return ( <ListItem key={item.id} disablePadding sx={{ display: 'block'}}>
          <ListItemButton
            onClick={() => handleSideBarItemClick(item.value)}
            sx={[
              { px: 2.5 },
              open
                ? { justifyContent: 'initial' }
                : { justifyContent: 'center' },
              {bgcolor: isActive ? 'rgb(250, 249, 246,.8)' : 'transparent',color: isActive ? 'black' : '#fff','&:hover': {
                bgcolor: isActive ? 'rgb(250, 249, 246, .8)' : 'rgb(250, 249, 246, .2)', 
              }, }
            ]}
          >
            <ListItemIcon
              sx={[
                { minWidth: 0, justifyContent: 'center', color: "#fff" },
                open ? { mr: 3 } : { mr: 'auto' },
                {color: isActive ? 'black' : '#fff'}
              ]}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              sx={[
                open ? { opacity: 1 } : { opacity: 0 },
              ]}
            />
          </ListItemButton>
        </ListItem>)

      }
      )}
    </List>
  );
};

export default Sidebar;
