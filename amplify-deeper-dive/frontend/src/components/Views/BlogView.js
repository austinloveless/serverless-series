// Dependencies
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import {
  Button,
  Container,
  Typography,
  makeStyles,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
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

const BlogView = ({ match, user }) => {
  const [blog, setBlog] = useState([]);
  const [posts, setPosts] = useState([]);
  const [draftPosts, setDraftPosts] = useState([]);
  const [createPost, setCreatePost] = useState(false);
  const [state, setState] = useState({
    viewDraft: false,
  });
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
    const publishedPosts = data.getBlog.posts.items.filter(
      (post) => post.draft === false
    );
    setPosts(publishedPosts);
    const draftedPosts = data.getBlog.posts.items.filter(
      (post) => post.draft === true
    );
    setDraftPosts(draftedPosts);
  };

  const handleToggleCreatePost = () => {
    createPost === false ? setCreatePost(true) : setCreatePost(false);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <Container>
      <Typography variant='h5'>Blog: {blog.name}</Typography>
      {blog.owner === user.email ||
      (blog.editors && blog.editors.includes(user.email)) ? (
        <Link to={{ pathname: `/blog/${blog.id}/edit/` }}>
          <Button color='primary' variant='outlined'>
            Edit
          </Button>
        </Link>
      ) : null}

      <S3Image className={classes.media} imgKey={blog.originalImage} />

      <Typography variant='h6'>Posts: </Typography>
      <Posts
        posts={posts}
        blog={blog}
        user={user}
        draftPosts={draftPosts}
        viewDraft={state.viewDraft}
      />
      <br />
      {blog.owner === user.email ||
      (blog.editors && blog.editors.includes(user.email)) ||
      (blog.writers && blog.writers.includes(user.email)) ? (
        <>
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={state.viewDraft}
                  onChange={handleChange}
                  name='viewDraft'
                  color='primary'
                />
              }
              label={
                state.viewDraft === false
                  ? 'Viewing Published Posts'
                  : 'Viewing Drafted Posts'
              }
            />
          </div>
          <div>
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleToggleCreatePost()}
            >
              Add Post
            </Button>
          </div>
        </>
      ) : null}
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
