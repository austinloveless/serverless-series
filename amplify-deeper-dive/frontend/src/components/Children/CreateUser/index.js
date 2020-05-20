import React, { useState } from 'react';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import {
  TextField,
  Button,
  makeStyles,
  Grid,
  Typography,
} from '@material-ui/core';
import { PhotoPicker } from 'aws-amplify-react';
import { v1 as uuidv1 } from 'uuid';

// Files
import { createUser } from '../../../graphql/mutations';
import useForm from '../../../hooks/useForm';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const INITIAL_STATE = {
  about: '',
};
const CreateUser = ({ user, setNoUser }) => {
  const { values, handleChanges } = useForm(INITIAL_STATE);
  const { about } = values;
  const [file, setFile] = useState({});
  const classes = useStyles();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const createUserPayload = {
      username: user.email,
      id: uuidv1(),
      profilePicture: `${user.email}/profilePicture/${file.name}`,
      about,
    };
    await Storage.put(`${user.email}/profilePicture/${file.name}`, file);

    const { data } = await API.graphql(
      graphqlOperation(createUser, {
        input: createUserPayload,
      })
    );
    return data.createUser ? setNoUser(false) : null;
  };

  const handleFileChange = (data) => {
    setFile(data.file);
  };

  return (
    <Grid container style={{ justifyContent: 'center' }}>
      <Typography>Create a User Profile</Typography>
      <form
        onSubmit={handleCreateUser}
        className={classes.root}
        autoComplete='off'
      >
        <br />
        <div>
          <TextField
            id='outlined-basic'
            label='About'
            variant='outlined'
            name='about'
            value={about}
            onChange={(e) => {
              handleChanges(e);
            }}
          />
        </div>
        <br />
        <PhotoPicker preview onPick={(data) => handleFileChange(data)} />

        <Button variant='contained' color='primary' type='submit'>
          Submit
        </Button>
      </form>
    </Grid>
  );
};

export default CreateUser;
