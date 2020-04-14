// Dependencies
import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { TextField, Button } from '@material-ui/core';

// Files
import { createPost } from '../../../graphql/mutations';

const CreatePost = ({ posts, blog, setPosts, setCreatePost }) => {
  const [postInput, setPostInput] = useState('');

  const handleAddPost = async (event) => {
    event.preventDefault();
    const payload = { title: postInput, postBlogId: blog.id };
    const { data } = await API.graphql(
      graphqlOperation(createPost, { input: payload })
    );
    const newPost = data.createPost;
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    setPostInput('');
    setCreatePost(false);
  };

  return (
    <div>
      <form onSubmit={handleAddPost}>
        <br />

        <TextField
          id='outlined-basic'
          label='Outlined'
          variant='outlined'
          value={postInput}
          onChange={({ target }) => setPostInput(target.value)}
        />
        <br />
        <br />

        <Button variant='contained' color='primary' type='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
