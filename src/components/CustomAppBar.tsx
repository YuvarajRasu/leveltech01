import { Avatar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';

import CustomSearch from './CustomSearch';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { imagePaths } from '../config/imagePaths';
import CustomMenu from './CustomMenu';
import CustomAvatar from './CustomAvatar';
import Header from '../pages/components/Header';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: 'none', // Remove box shadow to avoid any visual gap
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const CustomAppBar = ({ open, setOpen }: any) => {
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const listItems = [{ name: 'Eng' }, { name: 'Hi' }, { name: 'Es' }];
  return (
    <AppBar position="fixed" open={open} sx={{ bgcolor: '#e64a19', paddingBottom: 0 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 0 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerClose}
          edge="start"
          sx={[
            {
              marginRight: 5,
            },
            !open && { display: 'none' },
          ]}
        >
          <MenuOpenIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              marginRight: 5,
            },
            open && { display: 'none' },
          ]}
        >
          <MenuOpenIcon />
        </IconButton>
        {!open && (
          <Typography variant="h5" fontWeight={700} color="#fff">
            Level Tech
          </Typography>
        )}
        {/* <Box display={'flex'}>
          <Box pr={2}>
            <CustomSearch />
          </Box>
          <Box pr={2}>
            <CustomMenu title={'lang'} listItems={listItems} />
          </Box>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2}>
            <CustomAvatar src={imagePaths.inventory_bg} />
            <Typography fontWeight={600}>Name</Typography>
          </Box>
        </Box> */}
        <Header/>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
