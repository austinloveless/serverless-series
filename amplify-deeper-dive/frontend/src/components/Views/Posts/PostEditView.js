// Dependencies
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { S3Image, PhotoPicker } from 'aws-amplify-react';

import {
  Button,
  Card,
  Grid,
  CardContent,
  makeStyles,
  TextField,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';

// Files
import { getPost } from '../../../graphql/queries';
import { deletePost, updatePost } from '../../../graphql/mutations';
import { listBlogs } from '../../../graphql/queries';

const useStyles = makeStyles({
  card: {
    width: 700,
  },
  media: {
    width: 500,
    height: 500,
  },
});

const INTITIAL_STATE = {
  title: '',
  content: '',
  thumbnail: '',
  originalImage: '',
  writers: [],
  draft: Boolean,
  postBlogId: '',
};

const PostEditView = ({ match, history, user }) => {
  const [post, setPost] = useState(INTITIAL_STATE);
  const [changeImage, setChangeImage] = useState(false);
  const [file, setFile] = useState({});
  const [blogs, setBlogs] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    handleGetPost(match);
    handleListBlogs();
  }, [match]);

  const handleListBlogs = async () => {
    const { data } = await API.graphql(graphqlOperation(listBlogs));
    setBlogs(data.listBlogs.items);
  };

  const handleGetPost = async (match) => {
    const { data } = await API.graphql(
      graphqlOperation(getPost, {
        id: match.params.postId,
      })
    );
    setPost(data.getPost);
    setFile(data.getPost.originalImage);
  };

  const handleChanges = (e) => {
    setPost({
      ...post,
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

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    if (post.postBlogId) {
      const payload = {
        id: post.id,
        title: post.title,
        content: post.content,
        draft: post.draft,
        postBlogId: post.postBlogId,
        writers:
          typeof post.writers === 'string'
            ? post.writers.split(',')
            : post.writers,
        thumbnail: file.name
          ? `thumbnails/public/${user.email}/postImages/${post.name}/${file.name}`
          : `${post.thumbnail}`,
        originalImage: file.name
          ? `${user.email}/postImages/${post.name}/${file.name}`
          : `${post.originalImage}`,
      };
      if (file.name) {
        await Storage.put(
          `${user.email}/postImages/${post.name}/${file.name}`,
          file
        );
        setFile('');
      }
      const { data } = await API.graphql(
        graphqlOperation(updatePost, { input: payload })
      );

      const updatedPost = data.updatePost;
      setPost(updatedPost);
      history.push(`/`);
    } else {
      const payload = {
        id: post.id,
        title: post.title,
        content: post.content,
        draft: post.draft,
        writers:
          typeof post.writers === 'string'
            ? post.writers.split(',')
            : post.writers,
        thumbnail: file.name
          ? `thumbnails/public/${user.email}/postImages/${post.name}/${file.name}`
          : `${post.thumbnail}`,
        originalImage: file.name
          ? `${user.email}/postImages/${post.name}/${file.name}`
          : `${post.originalImage}`,
      };
      if (file.name) {
        await Storage.put(
          `${user.email}/postImages/${post.name}/${file.name}`,
          file
        );
        setFile('');
      }
      const { data } = await API.graphql(
        graphqlOperation(updatePost, { input: payload })
      );

      const updatedPost = data.updatePost;
      setPost(updatedPost);
      history.push(`/`);
    }
  };

  const handleDeletePost = async (id) => {
    const payload = { id };
    await API.graphql(graphqlOperation(deletePost, { input: payload }));
    history.push(`/posts`);
  };

  const handleToggleChangeImage = () => {
    changeImage === false ? setChangeImage(true) : setChangeImage(false);
  };

  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.checked });
  };

  return (
    <Grid container key={post.id} style={{ justifyContent: 'center' }}>
      <Card className={classes.card}>
        <CardContent>
          <Button
            color='secondary'
            onClick={() => handleDeletePost(post.id)}
            variant='outlined'
          >
            <span style={{ color: 'red' }}>Delete</span>
          </Button>
          {changeImage ? (
            <PhotoPicker
              preview
              title='Select a New Photo'
              onPick={(data) => handleFileChange(data)}
            />
          ) : (
            <S3Image
              className={classes.media}
              imgKey={post.originalImage}
              onClick={handleToggleChangeImage}
              style={{ cursor: 'pointer' }}
            />
          )}

          <form onSubmit={handleUpdatePost}>
            <div>
              <TextField
                id='outlined-basic'
                variant='outlined'
                value={post.title}
                name='title'
                onChange={(e) => {
                  handleChanges(e);
                }}
              />
            </div>
            <br />
            <div>
              <TextField
                id='standard-multiline-flexible'
                variant='outlined'
                name='content'
                multiline
                rows={4}
                value={post.content}
                onChange={(e) => {
                  handleChanges(e);
                }}
              />
            </div>
            <br />
            <div>
              <TextField
                iid='standard-multiline-flexible'
                variant='outlined'
                multiline
                rows={4}
                value={post.writers}
                name='writers'
                onChange={(e) => {
                  handleChanges(e);
                }}
              />
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel id='demo-simple-select-helper-label'>
                  Add to Blog
                </InputLabel>
                <Select
                  labelId='demo-simple-select-helper-label'
                  id='demo-simple-select-helper'
                  value={post.postBlogId}
                  name='postBlogId'
                  onChange={(e) => handleChanges(e)}
                >
                  {blogs.map((blog) => (
                    <MenuItem key={blog.id} value={blog.id}>
                      {blog.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  Add (or change) your post to a blog
                </FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControlLabel
                control={
                  <Switch
                    checked={post.draft}
                    onChange={handleChange}
                    name='draft'
                    color='primary'
                  />
                }
                label={
                  post.draft === true ? 'Saving as Draft' : 'Publishing Blog'
                }
              />
            </div>
            <br />
            <Button variant='outlined' color='primary' type='submit'>
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PostEditView;
