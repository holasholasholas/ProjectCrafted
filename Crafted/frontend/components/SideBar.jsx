import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';



export default function SideBar({open, onClose}) {
 
  const navItems = [
    // { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Login', icon: <MailIcon />, path: '/sign-in'},
    { text: 'User Panel', path:'/userpanel'},
    { text: 'test2', path:'/test-2'},
    { text: 'test3', path:'/test-3'}
  ];
  
  const navigate = useNavigate();
  
  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  }
  
  const DrawerList = (
    <Box sx={{ width: 230 }} role="presentation">
      <List>
        {navItems.map((item) => (
          <ListItem key={item. text} disablePadding>
            <ListItemButton onClick={() => handleNavigation(item.path)}>
              <ListItemIcon>
              {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
     
    </Box>
  );

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
    >
      {DrawerList}
    </Drawer>
  );
}