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
import { getPost } from '../../../graphql/queries';
import { deleteComment } from '../../../graphql/mutations';
import Comments from '../../Children/Comments';
import CommentForm from '../../Children/CommentForm';

const useStyles = makeStyles({
  card: {
    width: 700,
  },
  media: {
    width: 500,
    height: 500,
  },
});

const PostView = ({ match, user }) => {
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

  const handleDeleteComment = async (id) => {
    const payload = { id };
    const { data } = await API.graphql(
      graphqlOperation(deleteComment, { input: payload })
    );
    const updatedComments = comments.filter(
      (comment) => comment.id !== data.deleteComment.id
    );
    setComments(updatedComments);
  };

  return (
    <Grid container key={post.id} style={{ justifyContent: 'center' }}>
      <Card className={classes.card}>
        <CardContent>
          <S3Image className={classes.media} imgKey={post.originalImage} />

          <Typography variant='h5'> Post: {post.title}</Typography>
          <Typography variant='body1'>{post.content}</Typography>
          <Typography>Author: {post.owner}</Typography>
          <br />
          <br />
          {(post.editors && post.editors.includes(user.email)) ||
          (post.writers && post.writers.includes(user.email)) ? (
            <div>
              <Link
                to={{
                  pathname: `/blog/${match.params.blogId}/post/${post.id}/edit/`,
                }}
              >
                <Button color='primary' variant='outlined'>
                  Edit
                </Button>
              </Link>
              <Typography style={{ fontWeight: 'bold' }}>Editors:</Typography>
              {post.editors.map((editor) => (
                <Typography key={editor}>{editor}</Typography>
              ))}
            </div>
          ) : null}
          <br />
          <Typography style={{ fontWeight: 'bold' }}>Writers:</Typography>
          {post.writers &&
            post.writers.map((writer) => (
              <Typography key={writer}>{writer}</Typography>
            ))}
          <br />
          <Typography variant='h6'>Comments: </Typography>

          <Comments
            postOwner={post.owner}
            user={user}
            post={post}
            comments={comments}
            handleDeleteComment={handleDeleteComment}
          />
          <br />
          {createComment ? (
            <CommentForm
              comments={comments}
              setComments={setComments}
              setCreateComment={setCreateComment}
              post={post}
            />
          ) : (
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleToggleCreateComment()}
            >
              Add Comment
            </Button>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PostView;
