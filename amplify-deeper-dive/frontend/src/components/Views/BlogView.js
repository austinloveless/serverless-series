// Dependencies
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Button, Container, Typography, makeStyles } from '@material-ui/core';
import { S3Image } from 'aws-amplify-react';
import { Link } from 'react-router-dom';

// Files
import { getBlog } from '../../graphql/queries';
import Posts from '../Children/Posts';
import PostForm from '../Children/PostForm';

const useStyles = makeStyles({
  media: {
    width: 500,
    height: 500,
  },
});

const BlogView = ({ match, history, user }) => {
  const [blog, setBlog] = useState([]);
  const [posts, setPosts] = useState([]);
  const [createPost, setCreatePost] = useState(false);
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
    setPosts(data.getBlog.posts.items);
  };

  const handleToggleCreatePost = () => {
    createPost === false ? setCreatePost(true) : setCreatePost(false);
  };

  return (
    <Container>
      <Typography variant='h5'>Blog: {blog.name}</Typography>
      <Link to={{ pathname: `/${blog.id}/edit/blog` }}>
        <Button color='primary' variant='outlined'>
          Edit
        </Button>
      </Link>

      <S3Image className={classes.media} imgKey={blog.originalImage} />

      <Typography variant='h6'>Posts: </Typography>
      <Posts posts={posts} blog={blog} />
      <br />
      <Button
        variant='contained'
        color='primary'
        onClick={() => handleToggleCreatePost()}
      >
        Add Post
      </Button>
      {createPost ? (
        <PostForm
          user={user}
          posts={posts}
          blog={blog}
          setPosts={setPosts}
          setCreatePost={setCreatePost}
        />
      ) : null}
    </Container>
  );
};

export default BlogView;
