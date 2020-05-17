import React from 'react';
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    alignItems: 'center',
  },
}));

const UserNotifications = ({ userData }) => {
  const classes = useStyles();

  return (
    <Container style={{ marginLeft: 400 }}>
      <List
        component='nav'
        className={classes.root}
        aria-label='mailbox folders'
      >
        {userData.notifications.map((notification) => (
          <Link to={{ pathname: `blog/${null}/post/${notification.id}` }}>
            <ListItem button>
              <ListItemText primary={notification.user} />
              <ListItemText secondary={`uploaded a new ${notification.type}`} />
            </ListItem>
            <Divider />
          </Link>
        ))}
      </List>
    </Container>
  );
};

export default UserNotifications;
