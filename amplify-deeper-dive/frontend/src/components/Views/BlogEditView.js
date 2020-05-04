// Dependencies
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import {
  Button,
  Container,
  Typography,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { S3Image } from 'aws-amplify-react';
import { PhotoPicker } from 'aws-amplify-react';
import { Storage } from 'aws-amplify';

// Files
import { getBlog } from '../../graphql/queries';
import { deleteBlog } from '../../graphql/mutations';
import { updateBlog } from '../../graphql/mutations';

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
};

const BlogEditView = ({ match, history, user }) => {
  const [blog, setBlog] = useState(INTITIAL_STATE);
  const [file, setFile] = useState({});
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
    history.push('/');
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
    const updatedBlogs = data.updateBlog;
    setBlog(updatedBlogs);
    history.push(`/${blog.id}`);
  };

  return (
    <Container>
      <Typography variant='h5'>Blog: {blog.name}</Typography>
      <Button
        color='secondary'
        onClick={() => handleDeleteBlog(blog.id)}
        variant='outlined'
      >
        <span style={{ color: 'red' }}>Delete</span>
      </Button>
      <S3Image className={classes.media} imgKey={blog.originalImage} />
      <form onSubmit={handleUpdateBlog}>
        <br />
        <TextField
          id='outlined-basic'
          variant='outlined'
          value={blog.name}
          name='name'
          onChange={(e) => {
            handleChanges(e);
          }}
        />
        <PhotoPicker preview onPick={(data) => handleFileChange(data)} />

        <Button variant='contained' color='primary' type='submit'>
          Save
        </Button>
      </form>
    </Container>
  );
};

export default BlogEditView;
