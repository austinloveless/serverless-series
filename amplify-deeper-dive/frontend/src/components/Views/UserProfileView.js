import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react';
import { Link } from 'react-router-dom';
import { Button, Typography, makeStyles, Container } from '@material-ui/core';

// Files
import { getUser } from '../../graphql/queries';
import UserPosts from '../Children/UserPosts';

const useStyles = makeStyles({
  media: {
    width: 500,
    height: 500,
  },
});

const UserProfileView = ({ user, match }) => {
  const [userData, setUserData] = useState([]);
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

  return (
    <Container>
      <Typography>{userData.username}</Typography>
      <Typography>{userData.about}</Typography>

      <S3Image className={classes.media} imgKey={userData.profilePicture} />
      <Link
        to={{
          pathname: `/user-profile/${userData.username}/edit`,
        }}
      >
        <Button color='primary' variant='outlined'>
          Edit
        </Button>
      </Link>
      {userData.posts ? <UserPosts posts={userData.posts} /> : null}
      <br />
      <br />
    </Container>
  );
};

export default UserProfileView;
