// Dependencies
import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { TextField, Button } from '@material-ui/core';

// Files
import { createBlog } from '../../../graphql/mutations';

const CreateBlog = ({ setBlogs, blogs, setCreateBlog }) => {
  const [blogInput, setBlogInput] = useState('');

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const payload = { name: blogInput };
    const { data } = await API.graphql(
      graphqlOperation(createBlog, { input: payload })
    );
    const newBlog = data.createBlog;
    const updatedBlogs = [newBlog, ...blogs];
    setBlogs(updatedBlogs);
    setBlogInput('');
    setCreateBlog(false);
  };

  return (
    <div>
      <form onSubmit={handleAddBlog}>
        <br />
        <TextField
          id='outlined-basic'
          label='Outlined'
          variant='outlined'
          value={blogInput}
          onChange={({ target }) => setBlogInput(target.value)}
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

export default CreateBlog;
