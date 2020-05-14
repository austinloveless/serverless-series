// Dependencies
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { S3Image, PhotoPicker } from 'aws-amplify-react';

import {
  Button,
  Card,
  Grid,
  CardContent,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';

// Files
import { getUser } from '../../../graphql/queries';
import { updateUser } from '../../../graphql/mutations';

const useStyles = makeStyles({
  card: {
    width: 700,
  },
  media: {
    width: 500,
    height: 500,
  },
});

const INTITIAL_STATE = {
  about: '',
  profilePicture: '',
};

const UserProfileEditView = ({ match, history, user }) => {
  const [userData, setUserData] = useState(INTITIAL_STATE);
  const [changeImage, setChangeImage] = useState(false);
  const [file, setFile] = useState({});
  const classes = useStyles();

  useEffect(() => {
    handleGetUser(match);
  }, [match]);

  const handleGetUser = async (match) => {
    const { data } = await API.graphql(
      graphqlOperation(getUser, {
        username: match.params.username,
      })
    );
    setUserData(data.getUser);
    setFile(data.getUser.profilePicture);
  };

  const handleChanges = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (data) => {
    if (!data) {
      return;
    } else {
      setFile(data.file);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const payload = {
      id: userData.id,
      about: userData.about,
      username: userData.username,
      profilePicture: file.name
        ? `${userData.email}/userDataImages/${userData.name}/${file.name}`
        : `${userData.profilePicture}`,
    };
    if (file.name) {
      await Storage.put(
        `${userData.email}/userDataImages/${userData.name}/${file.name}`,
        file
      );
      setFile('');
    }
    const { data } = await API.graphql(
      graphqlOperation(updateUser, { input: payload })
    );
    const updatedUser = data.updateUser;
    setUserData(updatedUser);
    history.push(`/user-profile`);
  };

  const handleToggleChangeImage = () => {
    changeImage === false ? setChangeImage(true) : setChangeImage(false);
  };

  return (
    <Grid container key={userData.id} style={{ justifyContent: 'center' }}>
      {userData && userData.username && user.email !== userData.username ? (
        history.push('/user-profile')
      ) : (
        <Card className={classes.card}>
          <Typography>{userData.username}</Typography>
          <form onSubmit={handleUpdateUser}>
            <div>
              <TextField
                id='standard-multiline-flexible'
                variant='outlined'
                name='about'
                multiline
                rows={4}
                value={userData.about}
                onChange={(e) => {
                  handleChanges(e);
                }}
              />
            </div>
            <br />
            <Button variant='outlined' color='primary' type='submit'>
              Save
            </Button>
          </form>
          <CardContent>
            {changeImage ? (
              <PhotoPicker
                preview
                about='Select a New Photo'
                onPick={(data) => handleFileChange(data)}
              />
            ) : (
              <S3Image
                className={classes.media}
                imgKey={userData.profilePicture}
                onClick={handleToggleChangeImage}
                style={{ cursor: 'pointer' }}
              />
            )}
          </CardContent>
        </Card>
      )}
    </Grid>
  );
};

export default UserProfileEditView;
