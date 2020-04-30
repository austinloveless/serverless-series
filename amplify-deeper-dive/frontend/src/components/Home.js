// Dependencies
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Button, Container } from '@material-ui/core';
import { Auth } from 'aws-amplify';

// Files
import { listBlogs } from '../graphql/queries';
import Blogs from './Children/Blogs';
import BlogForm from './Children/BlogForm';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [createBlog, setCreateBlog] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    handleListBlogs();
    getUser();
  }, []);

  const handleListBlogs = async () => {
    const { data } = await API.graphql(graphqlOperation(listBlogs));
    setBlogs(data.listBlogs.items);
  };

  const getUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    setUser(user.signInUserSession.idToken.payload);
  };

  const handleToggleCreateBlog = () => {
    createBlog === false ? setCreateBlog(true) : setCreateBlog(false);
  };

  return (
    <Container maxWidth='lg'>
      <Blogs blogs={blogs} setBlogs={setBlogs} setCreateBlog={setCreateBlog} />
      <br />
      <Button
        variant='contained'
        color='primary'
        onClick={() => handleToggleCreateBlog()}
      >
        Add Blog
      </Button>
      {createBlog ? (
        <BlogForm
          user={user}
          blogs={blogs}
          setBlogs={setBlogs}
          setCreateBlog={setCreateBlog}
        />
      ) : null}
    </Container>
  );
};

export default Home;
