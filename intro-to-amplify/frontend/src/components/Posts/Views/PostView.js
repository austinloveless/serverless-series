// Dependencies
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import {
  Button,
  Typography,
  Card,
  Grid,
  CardContent,
  makeStyles,
} from '@material-ui/core';

// Files
import { getPost } from '../../../graphql/queries';
import { deletePost } from '../../../graphql/mutations';
import CommentChild from '../Children/Comments/CommentChild';
import CreateComment from '../Children/Comments/CreateComment';

const useStyles = makeStyles({
  card: {
    width: 700,
  },
});

const Post = ({ match, history }) => {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [createComment, setCreateComment] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    handleGetPost();
  }, []);

  const handleGetPost = async () => {
    const { data } = await API.graphql(
      graphqlOperation(getPost, {
        id: match.params.postId,
      })
    );
    setPost(data.getPost);
    setComments(data.getPost.comments.items);
  };

  const handleDeletePost = async (id) => {
    const payload = { id };
    await API.graphql(graphqlOperation(deletePost, { input: payload }));
    history.push('/');
  };

  const handleToggleCreateComment = () => {
    createComment === false ? setCreateComment(true) : setCreateComment(false);
  };

  return (
    <Grid container key={post.id} style={{ justifyContent: 'center' }}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='h5'> Post: {post.title}</Typography>
          <Typography variant='body1'>{post.content}</Typography>
          <br />
          <br />
          <Button
            color='secondary'
            onClick={() => handleDeletePost(post.id)}
            variant='outlined'
          >
            <span style={{ color: 'red' }}>Delete</span>
          </Button>
          <Typography variant='h6'>Comments: </Typography>

          <CommentChild comments={comments} />
          <br />
          <Button
            variant='contained'
            color='primary'
            onClick={() => handleToggleCreateComment()}
          >
            Add Comment
          </Button>
          {createComment ? (
            <CreateComment
              comments={comments}
              setComments={setComments}
              setCreateComment={setCreateComment}
              post={post}
            />
          ) : null}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Post;
