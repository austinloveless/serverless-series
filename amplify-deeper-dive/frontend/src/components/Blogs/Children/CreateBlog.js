// Dependencies
import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { TextField, Button } from '@material-ui/core';
import { Storage } from 'aws-amplify';
import { PhotoPicker } from 'aws-amplify-react';

// Files
import { createBlog } from '../../../graphql/mutations';

const CreateBlog = ({ setBlogs, blogs, setCreateBlog }) => {
  const [blogInput, setBlogInput] = useState('');
  const [file, setFile] = useState({});

  const handleFileChange = (data) => {
    console.log('data: ', data);
    setFile(data.file);
  };

  const handleSaveFile = async () => {
    await Storage.put(file.name, file);
    console.log('successfully saved file...');
  };

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
        <Button variant='outlined' color='primary' onClick={handleSaveFile}>
          Save File
        </Button>
      </form>
    </div>
  );
};

export default CreateBlog;
