import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import CustomAppBar from './CustomAppBar';
import { Outlet } from 'react-router-dom';
import Sidebar from '../pages/components/Sidebar';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: 0,  // Remove padding here to eliminate the gap
  // borderRight:"none",
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    backgroundColor: 'black',
    color: '#fff',
    borderRight: 'none',
    '& .MuiDrawer-paper': {
      backgroundColor: '#333', // Drawer paper background color (when open or closed)
      color: '#fff', // Text color for items inside the drawer,
      borderRight: 'none',
    },
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
          // borderRight:"none"
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
          // borderRight:"none"
        },
      },
    ],
  })
);

export default function CustomDrawer() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('lg'));
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    setOpen(!matches); // Update state when screen size changes
  }, [matches]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <CustomAppBar open={open} setOpen={setOpen} drawerWidth={drawerWidth} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ bgcolor: "#e64a19", display: "flex", justifyContent: "Center" }}>
          <Typography variant='h5' fontWeight={700} color='#fff'>Level Tech</Typography>
        </DrawerHeader>
        <Sidebar open={open} />
      </Drawer>
      <Box component="main" sx={{
        flexGrow: 1, px: 2, pt:2, ml: open ? `0px` : ` 1px`, 
        transition: theme.transitions.create('margin-left', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'auto', // Prevent horizontal overflow and enable scrolling
        height: '100vh',   // Ensure the content area takes the full height of the viewport
        display: 'flex', 
        flexDirection: 'column',
      }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
