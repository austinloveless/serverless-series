// Dependencies
import React, { useState } from 'react';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import {
  TextField,
  Button,
  makeStyles,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import { PhotoPicker } from 'aws-amplify-react';

// Files
import { createPost } from '../../../graphql/mutations';
import useForm from '../../../hooks/useForm';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const INITIAL_POST_STATE = {
  title: '',
  content: '',
};
const PostForm = ({ posts, blog, setPosts, setCreatePost, user }) => {
  const { values, handleChanges } = useForm(INITIAL_POST_STATE);
  const { title, content } = values;
  const [state, setState] = useState({
    draft: false,
  });
  const [file, setFile] = useState({});
  const classes = useStyles();

  const handleFileChange = (data) => {
    setFile(data.file);
  };

  const handleAddPost = async (event) => {
    event.preventDefault();
    const imageTitle = title.replace(/\s+/g, '-');

    const payload = {
      title,
      content,
      postBlogId: blog.id,
      postUserId: user.email,
      thumbnail: `thumbnails/public/${user.email}/postImages/${imageTitle}/${file.name}`,
      originalImage: `${user.email}/postImages/${imageTitle}/${file.name}`,
      editors: blog.editors,
      writers: blog.writers,
      draft: state.draft === false ? true : false,
    };
    const { data } = await API.graphql(
      graphqlOperation(createPost, { input: payload })
    );
    await Storage.put(
      `${user.email}/postImages/${imageTitle}/${file.name}`,
      file
    );
    const newPost = data.createPost;
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    setCreatePost(false);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <form
        onSubmit={handleAddPost}
        className={classes.root}
        autoComplete='off'
      >
        <br />
        <div>
          <TextField
            id='outlined-basic'
            label='Title'
            variant='outlined'
            name='title'
            value={title}
            onChange={(e) => {
              handleChanges(e);
            }}
          />
        </div>

        <div>
          <TextField
            id='standard-multiline-flexible'
            label='Content'
            variant='outlined'
            name='content'
            multiline
            rows={4}
            value={content}
            onChange={(e) => {
              handleChanges(e);
            }}
          />
        </div>
        <div>
          <FormControlLabel
            control={
              <Switch
                checked={state.draft}
                onChange={handleChange}
                name='draft'
                color='primary'
              />
            }
            label={
              state.draft === false ? 'Saving as Draft' : 'Publishing Post'
            }
          />
        </div>
        <br />
        <PhotoPicker preview onPick={(data) => handleFileChange(data)} />

        <Button variant='contained' color='primary' type='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
