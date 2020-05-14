// Dependencies
import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { TextField, Button, FormHelperText } from '@material-ui/core';
import { Storage } from 'aws-amplify';
import { PhotoPicker } from 'aws-amplify-react';

// Files
import { createBlog } from '../../../graphql/mutations';
import useForm from '../../../hooks/useForm';

const INITIAL_BLOG_STATE = {
  name: '',
  editors: [],
  writers: [],
};

const BlogForm = ({ setBlogs, blogs, user, history }) => {
  const { values, handleChanges } = useForm(INITIAL_BLOG_STATE);
  const { name, editors, writers } = values;
  const [file, setFile] = useState({});

  const handleFileChange = (data) => {
    setFile(data.file);
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const imageName = name.replace(/\s+/g, '-');

    const payload = {
      name: name,
      editors: typeof editors === 'string' ? editors.split(',') : editors,
      writers: typeof writers === 'string' ? writers.split(',') : writers,
      thumbnail: `thumbnails/public/${user.email}/blogImages/${imageName}/${file.name}`,
      originalImage: `${user.email}/blogImages/${imageName}/${file.name}`,
    };
    const { data } = await API.graphql(
      graphqlOperation(createBlog, { input: payload })
    );
    await Storage.put(
      `${user.email}/blogImages/${imageName}/${file.name}`,
      file
    );
    const newBlog = data.createBlog;
    const updatedBlogs = [newBlog, ...blogs];
    setBlogs(updatedBlogs);
    history.push('/blogs');
  };

  return (
    <div>
      <form onSubmit={handleAddBlog}>
        <br />
        <div>
          <TextField
            id='outlined-basic'
            label='Name'
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
          <FormHelperText>
            Editors can review submissions, add stories, edit and publish
            submitted drafts, and remove any stories from this Blog.
          </FormHelperText>
          <TextField
            id='outlined-basic'
            label='Writers'
            variant='outlined'
            name='writers'
            value={writers}
            onChange={(e) => handleChanges(e)}
          />
          <FormHelperText>
            Add new writers. Writers can submit their stories and remove them
            from this Blog.
          </FormHelperText>
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
