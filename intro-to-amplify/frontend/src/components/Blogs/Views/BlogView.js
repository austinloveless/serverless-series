// Dependencies
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Button, Container, Typography } from '@material-ui/core';

// Files
import { getBlog } from '../../../graphql/queries';
import { deleteBlog } from '../../../graphql/mutations';
import PostChild from '../../Posts/Children/PostChild';
import CreatePost from '../../Posts/Children/CreatePost';

const Blog = ({ match, history }) => {
  const [blog, setBlog] = useState([]);
  const [posts, setPosts] = useState([]);
  const [createPost, setCreatePost] = useState(false);

  useEffect(() => {
    handleGetBlog();
  }, []);

  const handleGetBlog = async () => {
    const { data } = await API.graphql(
      graphqlOperation(getBlog, {
        id: match.params.blogId,
      })
    );
    setBlog(data.getBlog);
    setPosts(data.getBlog.posts.items);
  };

  const handleDeleteBlog = async (id) => {
    const payload = { id };
    await API.graphql(graphqlOperation(deleteBlog, { input: payload }));
    history.push('/');
  };

  const handleToggleCreatePost = () => {
    createPost === false ? setCreatePost(true) : setCreatePost(false);
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
      <Typography variant='h6'>Posts: </Typography>
      <PostChild posts={posts} blog={blog} />
      <br />
      <Button
        variant='contained'
        color='primary'
        onClick={() => handleToggleCreatePost()}
      >
        Add Post
      </Button>
      {createPost ? (
        <CreatePost
          posts={posts}
          blog={blog}
          setPosts={setPosts}
          setCreatePost={setCreatePost}
        />
      ) : null}
    </Container>
  );
};

export default Blog;
