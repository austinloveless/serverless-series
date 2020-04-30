// Dependencies
import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { TextField, Button, makeStyles } from '@material-ui/core';

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
const PostForm = ({ posts, blog, setPosts, setCreatePost }) => {
  const { values, handleChanges } = useForm(INITIAL_POST_STATE);
  const { title, content } = values;
  const classes = useStyles();

  const handleAddPost = async (event) => {
    event.preventDefault();
    const payload = { title, content, postBlogId: blog.id };
    const { data } = await API.graphql(
      graphqlOperation(createPost, { input: payload })
    );
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
        <Button variant='contained' color='primary' type='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
