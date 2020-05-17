import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react';
import { Link } from 'react-router-dom';
import {
  Button,
  Typography,
  makeStyles,
  Container,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { Notifications } from '@material-ui/icons';

// Files
import { getUser } from '../../../graphql/queries';
import UserPosts from '../../Children/UserPosts';
import UserNotifications from '../../Children/UserNotifications';

const useStyles = makeStyles({
  media: {
    width: 500,
    height: 500,
  },
});

const UserProfileView = ({ user }) => {
  const [userData, setUserData] = useState([]);
  const [state, setState] = useState({
    viewDraft: false,
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const handleGetUser = async () => {
      const { data } = await API.graphql(
        graphqlOperation(getUser, {
          username: user.email,
        })
      );
      setUserData(data.getUser);
    };
    handleGetUser();
  }, [user.email]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleToggleNotifications = () => {
    showNotifications === false
      ? setShowNotifications(true)
      : setShowNotifications(false);
  };

  return (
    <Container>
      <Typography>{userData.username}</Typography>
      <Typography>{userData.about}</Typography>
      <div
        style={{ cursor: 'pointer', margin: 'inherit' }}
        onClick={handleToggleNotifications}
      >
        <Notifications
          color={userData.notifications ? 'secondary' : 'primary'}
        />
        <Typography>
          Notifications:{' '}
          {userData.notifications ? userData.notifications.length : null}
        </Typography>
      </div>
      <S3Image className={classes.media} imgKey={userData.profilePicture} />
      {showNotifications ? (
        <UserNotifications userData={userData} />
      ) : (
        <>
          <Link
            to={{
              pathname: `/user-profile/${userData.username}/edit`,
            }}
          >
            <Button color='primary' variant='outlined'>
              Edit
            </Button>
          </Link>
          <div>
            <Typography>Followers:</Typography>
            <Typography>
              {userData.followers
                ? userData.followers.map((follower, i) => (
                    <Link key={i} to={`/user/${follower.username}`}>
                      <div>{follower.username}</div>
                    </Link>
                  ))
                : null}
            </Typography>
          </div>
          <br />
          <div>
            <Typography>Following:</Typography>
            <Typography>
              {userData.following
                ? userData.following.map((following, i) => (
                    <Link key={i} to={`/user/${following.username}`}>
                      <div>{following.username}</div>
                    </Link>
                  ))
                : null}
            </Typography>
          </div>

          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={state.viewDraft}
                  onChange={handleChange}
                  name='viewDraft'
                  color='primary'
                />
              }
              label={
                state.viewDraft === false
                  ? 'Viewing Published Posts'
                  : 'Viewing Drafted Posts'
              }
            />
          </div>
          {userData.posts ? (
            <UserPosts posts={userData.posts} viewDraft={state.viewDraft} />
          ) : (
            <Link to='/new/post'>Create Post</Link>
          )}
        </>
      )}
      <br />
      <br />
    </Container>
  );
};

export default UserProfileView;
