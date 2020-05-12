// Dependencies
import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { TextField, Button } from '@material-ui/core';
import { Storage } from 'aws-amplify';
import { PhotoPicker } from 'aws-amplify-react';

// Files
import { createBlog } from '../../../graphql/mutations';
import useForm from '../../../hooks/useForm';

const INITIAL_BLOG_STATE = {
  name: '',
  editors: [],
};

const BlogForm = ({ setBlogs, blogs, setCreateBlog, user }) => {
  const { values, handleChanges } = useForm(INITIAL_BLOG_STATE);
  const { name, editors } = values;
  const [file, setFile] = useState({});

  const handleFileChange = (data) => {
    setFile(data.file);
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const payload = {
      name: name,
      editors: typeof editors === 'string' ? editors.split(',') : editors,
      thumbnail: `thumbnails/public/${user.email}/blogImages/${name}/${file.name}`,
      originalImage: `${user.email}/blogImages/${name}/${file.name}`,
    };
    console.log('pay', payload);
    const { data } = await API.graphql(
      graphqlOperation(createBlog, { input: payload })
    );
    await Storage.put(`${user.email}/blogImages/${name}/${file.name}`, file);
    const newBlog = data.createBlog;
    const updatedBlogs = [newBlog, ...blogs];
    setBlogs(updatedBlogs);
    setCreateBlog(false);
  };

  return (
    <div>
      <form onSubmit={handleAddBlog}>
        <br />
        <div>
          <TextField
            id='outlined-basic'
            label='Title'
            variant='outlined'
            name='name'
            value={name}
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <br />
        <div>
          <TextField
            id='outlined-basic'
            label='Editors'
            variant='outlined'
            name='editors'
            value={editors}
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <PhotoPicker preview onPick={(data) => handleFileChange(data)} />
        <Button variant='contained' color='primary' type='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
