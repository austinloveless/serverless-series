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
import { S3Image } from 'aws-amplify-react';
import { Link } from 'react-router-dom';

// Files
import { getPost } from '../../graphql/queries';
import Comments from '../Children/Comments';
import CommentForm from '../Children/CommentForm';

const useStyles = makeStyles({
  card: {
    width: 700,
  },
  media: {
    width: 500,
    height: 500,
  },
});

const PostView = ({ match, history }) => {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [createComment, setCreateComment] = useState(false);
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
    setComments(data.getPost.comments.items);
  };

  const handleToggleCreateComment = () => {
    createComment === false ? setCreateComment(true) : setCreateComment(false);
  };

  return (
    <Grid container key={post.id} style={{ justifyContent: 'center' }}>
      <Card className={classes.card}>
        <CardContent>
          <S3Image className={classes.media} imgKey={post.originalImage} />

          <Typography variant='h5'> Post: {post.title}</Typography>
          <Typography variant='body1'>{post.content}</Typography>
          <br />
          <br />
          <Link
            to={{ pathname: `/${match.params.blogId}/${post.id}/edit/post` }}
          >
            <Button color='primary' variant='outlined'>
              Edit
            </Button>
          </Link>
          <Typography variant='h6'>Comments: </Typography>

          <Comments comments={comments} />
          <br />
          <Button
            variant='contained'
            color='primary'
            onClick={() => handleToggleCreateComment()}
          >
            Add Comment
          </Button>
          {createComment ? (
            <CommentForm
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

export default PostView;
