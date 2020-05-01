// Dependencies
import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { Storage } from 'aws-amplify';
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
  const [file, setFile] = useState({});
  const classes = useStyles();

  const handleFileChange = (data) => {
    setFile(data.file);
  };

  const handleAddPost = async (event) => {
    event.preventDefault();
    const payload = {
      title,
      content,
      postBlogId: blog.id,
      thumbnail: `thumbnails/public/${user.email}/postImages/${title}/${file.name}`,
      originalImage: `${user.email}/postImages/${title}/${file.name}`,
    };
    const { data } = await API.graphql(
      graphqlOperation(createPost, { input: payload })
    );
    await Storage.put(`${user.email}/postImages/${title}/${file.name}`, file);

    const newPost = data.createPost;
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    setCreatePost(false);
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
