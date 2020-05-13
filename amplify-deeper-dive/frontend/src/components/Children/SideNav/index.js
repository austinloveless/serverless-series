import React from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import {
  Drawer,
  List,
  CssBaseline,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import {
  ChevronLeft,
  ChevronRight,
  Wallpaper,
  Assessment,
} from '@material-ui/icons';

import { useStyles } from './style';

const SideNav = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  let history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleIconClick = (route) => {
    history.push(route);
  };

  const iconMap = {
    0: { icon: <Wallpaper />, route: '/' },
    1: { icon: <Assessment />, route: '/blogs' },
    2: { icon: <Assessment />, route: '/posts' },
    3: { icon: <Assessment />, route: '/user-profile' },
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {open ? (
            <>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeft />
              </IconButton>
            </>
          ) : (
            <IconButton onClick={handleDrawerOpen}>
              <ChevronRight />
            </IconButton>
          )}
        </div>
        <Divider />
        <List>
          {['Home', 'Blogs', 'Posts', 'User Profile'].map((text, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleIconClick(iconMap[index].route)}
            >
              <ListItemIcon>{iconMap[index].icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>{props.children}</main>
    </div>
  );
};
export default SideNav;
