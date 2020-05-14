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
  Create,
  Book,
  Home,
  Add,
  AccountBox,
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
    0: { icon: <Home />, route: '/' },
    1: { icon: <Book />, route: '/blogs' },
    2: { icon: <Add />, route: '/new/blog' },
    3: { icon: <Create />, route: '/new/post' },
    4: { icon: <AccountBox />, route: '/user-profile' },
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
          {['Home', 'Blogs', 'Create Blog', 'Create Post', 'User Profile'].map(
            (text, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleIconClick(iconMap[index].route)}
              >
                <ListItemIcon>{iconMap[index].icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <main className={classes.content}>{props.children}</main>
    </div>
  );
};
export default SideNav;
