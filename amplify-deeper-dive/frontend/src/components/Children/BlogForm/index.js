// Dependencies
import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { TextField, Button } from '@material-ui/core';
import { Storage } from 'aws-amplify';
import { PhotoPicker } from 'aws-amplify-react';

// Files
import { createBlog } from '../../../graphql/mutations';

const BlogForm = ({ setBlogs, blogs, setCreateBlog, user }) => {
  const [blogInput, setBlogInput] = useState('');
  const [file, setFile] = useState({});

  const handleFileChange = (data) => {
    setFile(data.file);
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const payload = {
      name: blogInput,
      thumbnail: `${user.email}/${blogInput}/${file.name}`,
    };
    const { data } = await API.graphql(
      graphqlOperation(createBlog, { input: payload })
    );
    await Storage.put(`${user.email}/${blogInput}/${file.name}`, file);
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
          label='Create Blog'
          variant='outlined'
          value={blogInput}
          onChange={({ target }) => setBlogInput(target.value)}
        />
        <br />
        <br />
        <Button variant='contained' color='primary' type='submit'>
          Submit
        </Button>
        <PhotoPicker preview onPick={(data) => handleFileChange(data)} />
      </form>
    </div>
  );
};

export default BlogForm;
