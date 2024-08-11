import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'; 
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';

const drawerWidth = 240;

const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get('status');

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ overflow: 'auto' }} mr={ 2 } mt={ 14 }>
          <List>
          <ListItemButton onClick={ () => navigate('/cases')} selected={ !status }>
            <ListItemIcon>
                <WorkOutlineOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary="All Cases" />
            </ListItemButton>
            <ListItemButton onClick={ () => navigate('/cases?status=In progress')} selected={ status === 'In progress'}>
              <ListItemIcon>
                <PendingOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Pending Cases" />
            </ListItemButton>
            <ListItemButton onClick={ () => navigate('/cases?status=Accepted')} selected={ status === 'Accepted'}>
              <ListItemIcon>
                <CheckCircleOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Accepted Cases" />
            </ListItemButton>
            <ListItemButton onClick={ () => navigate('/cases?status=Rejected')} selected={ status === 'Rejected'}>
              <ListItemIcon>
                <CancelOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Rejected Cases" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', pt: 1, px: 2}}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
