import React from 'react';
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    alignItems: 'center',
  },
}));

const UserNotifications = ({ userData, handleDeleteNotification }) => {
  const classes = useStyles();

  return (
    <List
      component='nav'
      className={classes.root}
      aria-label='mailbox folders'
      style={{ marginLeft: 365 }}
    >
      {userData.notifications.map((notification, i) => (
        <Link to={{ pathname: `blog/${null}/post/${notification.id}` }}>
          <ListItem button>
            <ListItemText primary={notification.user} />
            <ListItemText secondary={`uploaded a new ${notification.type}`} />
            <DeleteForeverIcon
              color='secondary'
              onClick={() => handleDeleteNotification(i)}
            />
          </ListItem>
          <Divider />
        </Link>
      ))}
    </List>
  );
};

export default UserNotifications;
