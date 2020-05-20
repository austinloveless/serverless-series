import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react';
import { Typography, makeStyles, Container, Button } from '@material-ui/core';

// Files
import { getUser } from '../../../graphql/queries';
import { updateUser } from '../../../graphql/mutations';

import UserPosts from '../../Children/UserPosts';

const useStyles = makeStyles({
  media: {
    width: 500,
    height: 500,
  },
});

const UserView = ({ match, user, loggedInUserData }) => {
  const [userData, setUserData] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const handleGetUser = async () => {
      const { data } = await API.graphql(
        graphqlOperation(getUser, {
          username: match.params.username,
        })
      );
      setUserData(data.getUser);
      if (data.getUser.followers) {
        data.getUser.followers.map((follower) => {
          if (follower.username === user.email) {
            setIsFollowed(true);
          }
          return true;
        });
      }
    };
    handleGetUser();
  }, [match, user.email]);

  const handleFollowUser = async () => {
    if (isFollowed) {
      const unFollowArray = userData.followers.filter(
        (follower) => follower.username !== user.email
      );
      setIsFollowed(false);

      const followersPayload = {
        id: userData.id,
        username: userData.username,
        followers: unFollowArray,
      };
      await API.graphql(
        graphqlOperation(updateUser, { input: followersPayload })
      );

      const unFollowingArray = loggedInUserData.following.filter(
        (following) => following.username !== userData.username
      );
      const followingPayload = {
        id: loggedInUserData.id,
        username: loggedInUserData.username,
        following: unFollowingArray,
      };

      await API.graphql(
        graphqlOperation(updateUser, { input: followingPayload })
      );
    } else {
      let followers = [];
      if (
        userData.followers &&
        userData.followers.length &&
        loggedInUserData.notifications &&
        loggedInUserData.notifications.length
      ) {
        followers = [
          ...userData.followers,
          {
            id: loggedInUserData.id,
            username: loggedInUserData.username,
            notifications: {
              type: loggedInUserData.notifications[0].type,
              user: loggedInUserData.notifications[0].user,
              id: loggedInUserData.notifications[0].id,
            },
          },
        ];
      } else if (
        userData.followers &&
        userData.followers.length &&
        !loggedInUserData.notifications
      ) {
        followers = [
          ...userData.followers,
          {
            id: loggedInUserData.id,
            username: loggedInUserData.username,
            notifications: {
              type: null,
              user: null,
              id: null,
            },
          },
        ];
      } else if (
        userData.followers &&
        !userData.followers.length &&
        loggedInUserData.notifications &&
        loggedInUserData.notifications.length
      ) {
        followers = [
          {
            id: loggedInUserData.id,
            username: loggedInUserData.username,
            notifications: {
              type: loggedInUserData.notifications[0].type,
              user: loggedInUserData.notifications[0].user,
              id: loggedInUserData.notifications[0].id,
            },
          },
        ];
      } else if (
        userData.followers &&
        !userData.followers.length &&
        loggedInUserData.notifications &&
        !loggedInUserData.notifications.length
      ) {
        followers = [
          {
            id: loggedInUserData.id,
            username: loggedInUserData.username,
            notifications: {
              type: null,
              user: null,
              id: null,
            },
          },
        ];
      } else if (
        userData.followers &&
        !userData.followers.length &&
        loggedInUserData.notifications === null
      ) {
        followers = [
          {
            id: loggedInUserData.id,
            username: loggedInUserData.username,
            notifications: {
              type: null,
              user: null,
              id: null,
            },
          },
        ];
      }

      const followersPayload = {
        id: userData.id,
        username: userData.username,
        followers,
      };

      const { data } = await API.graphql(
        graphqlOperation(updateUser, { input: followersPayload })
      );

      const following = loggedInUserData.following
        ? [
            ...loggedInUserData.following,
            { id: userData.id, username: userData.username },
          ]
        : [{ id: userData.id, username: userData.username }];

      const followingPayload = {
        id: loggedInUserData.id,
        username: loggedInUserData.username,
        following,
      };
      const test = await API.graphql(
        graphqlOperation(updateUser, { input: followingPayload })
      );

      setIsFollowed(true);
    }
  };

  return (
    <Container>
      <Typography>{userData.username}</Typography>
      <Typography>{userData.about}</Typography>

      <S3Image className={classes.media} imgKey={userData.profilePicture} />
      {user.email !== userData.username ? (
        <Button onClick={handleFollowUser} variant='outlined' color='primary'>
          {isFollowed ? 'UnFollow' : 'Follow'}
        </Button>
      ) : null}
      {userData.posts ? <UserPosts posts={userData.posts} /> : null}
      <br />
      <br />
    </Container>
  );
};

export default UserView;
