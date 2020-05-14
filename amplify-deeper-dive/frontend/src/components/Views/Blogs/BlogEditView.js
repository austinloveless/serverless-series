// Dependencies
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { S3Image, PhotoPicker } from 'aws-amplify-react';

import {
  Button,
  Container,
  Typography,
  makeStyles,
  TextField,
  FormHelperText,
} from '@material-ui/core';

// Files
import { getBlog } from '../../../graphql/queries';
import { deleteBlog, updateBlog } from '../../../graphql/mutations';

const useStyles = makeStyles({
  media: {
    width: 500,
    height: 500,
  },
});

const INTITIAL_STATE = {
  name: '',
  thumbnail: '',
  originalImage: '',
  editors: [],
  writers: [],
};

const BlogEditView = ({ match, history, user }) => {
  const [blog, setBlog] = useState(INTITIAL_STATE);
  const [file, setFile] = useState({});
  const [changeImage, setChangeImage] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    handleGetBlog(match);
  }, [match]);

  const handleGetBlog = async (match) => {
    const { data } = await API.graphql(
      graphqlOperation(getBlog, {
        id: match.params.blogId,
      })
    );
    setBlog(data.getBlog);
    setFile(data.getBlog.originalImage);
  };

  const handleDeleteBlog = async (id) => {
    const payload = { id };
    await API.graphql(graphqlOperation(deleteBlog, { input: payload }));
    history.push('/blogs');
  };

  const handleChanges = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (data) => {
    if (!data) {
      return;
    } else {
      setFile(data.file);
    }
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    const payload = {
      id: blog.id,
      name: blog.name,
      editors:
        typeof blog.editors === 'string'
          ? blog.editors.split(',')
          : blog.editors,
      writers:
        typeof blog.writers === 'string'
          ? blog.writers.split(',')
          : blog.writers,
      thumbnail: file.name
        ? `thumbnails/public/${user.email}/blogImages/${blog.name}/${file.name}`
        : `${blog.thumbnail}`,
      originalImage: file.name
        ? `${user.email}/blogImages/${blog.name}/${file.name}`
        : `${blog.originalImage}`,
    };
    if (file.name) {
      await Storage.put(
        `${user.email}/blogImages/${blog.name}/${file.name}`,
        file
      );
      setFile('');
    }
    const { data } = await API.graphql(
      graphqlOperation(updateBlog, { input: payload })
    );
    const updatedBlog = data.updateBlog;
    setBlog(updatedBlog);
    history.push(`/blogs`);
  };

  const handleToggleChangeImage = () => {
    changeImage === false ? setChangeImage(true) : setChangeImage(false);
  };

  return (
    <Container>
      <Typography variant='h5'>Blog: {blog.name}</Typography>
      {blog.owner === user.email ? (
        <Button
          color='secondary'
          onClick={() => handleDeleteBlog(blog.id)}
          variant='outlined'
        >
          <span style={{ color: 'red' }}>Delete</span>
        </Button>
      ) : null}
      {changeImage ? (
        <PhotoPicker
          preview
          title='Select a New Photo'
          onPick={(data) => handleFileChange(data)}
        />
      ) : (
        <S3Image
          className={classes.media}
          imgKey={blog.originalImage}
          onClick={handleToggleChangeImage}
          style={{ cursor: 'pointer' }}
        />
      )}

      <form onSubmit={handleUpdateBlog}>
        <div>
          <TextField
            id='outlined-basic'
            variant='outlined'
            value={blog.name}
            name='name'
            onChange={(e) => {
              handleChanges(e);
            }}
          />
        </div>
        <br />

        <div>
          <TextField
            id='outlined-basic'
            label='Editors'
            variant='outlined'
            name='editors'
            value={blog.editors}
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
            value={blog.writers}
            onChange={(e) => handleChanges(e)}
          />
          <FormHelperText>
            Add new writers. Writers can submit their stories and remove them
            from this Blog.
          </FormHelperText>
        </div>
        <Button variant='outlined' color='primary' type='submit'>
          Save
        </Button>
      </form>
    </Container>
  );
};

export default BlogEditView;
