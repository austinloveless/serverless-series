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
} from '@material-ui/core';

// Files
import { getPost } from '../../graphql/queries';
import { deletePost, updatePost } from '../../graphql/mutations';

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
};

const PostEditView = ({ match, history, user }) => {
  const [post, setPost] = useState(INTITIAL_STATE);
  const [changeImage, setChangeImage] = useState(false);
  const [file, setFile] = useState({});
  const classes = useStyles();

  useEffect(() => {
    handleGetPost(match);
  }, [match]);

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
    const payload = {
      id: post.id,
      title: post.title,
      content: post.content,
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
    history.push(`/blog/${match.params.blogId}/post/${post.id}`);
  };

  const handleDeletePost = async (id) => {
    const payload = { id };
    await API.graphql(graphqlOperation(deletePost, { input: payload }));
    history.push(`/blog/${match.params.blogId}/post/${post.id}`);
  };

  const handleToggleChangeImage = () => {
    changeImage === false ? setChangeImage(true) : setChangeImage(false);
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
