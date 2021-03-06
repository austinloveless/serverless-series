import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Grid,
} from '@material-ui/core';
import { S3Image } from 'aws-amplify-react';

const useStyles = makeStyles({
  root: {
    width: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
});

const Posts = ({ posts, blog, draftPosts, viewDraft }) => {
  const classes = useStyles();

  const displayPosts = () => {
    if (viewDraft === true) {
      return draftPosts.map((post) => (
        <Grid item key={post.id}>
          <Card className={classes.root}>
            <CardContent>
              <S3Image imgKey={post.thumbnail} />

              <Typography variant='h5' component='h2'>
                <Link to={{ pathname: `/blog/${blog.id}/post/${post.id}` }}>
                  {post.title}
                </Link>
              </Typography>
              <Typography
                className={classes.title}
                color='textSecondary'
                gutterBottom
              >
                Owner:
              </Typography>
              <Typography className={classes.pos} color='textSecondary'>
                {post.owner}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ));
    } else {
      return posts.map((post) => (
        <Grid item key={post.id}>
          <Card className={classes.root}>
            <CardContent>
              <S3Image imgKey={post.thumbnail} />

              <Typography variant='h5' component='h2'>
                <Link to={{ pathname: `/blog/${blog.id}/post/${post.id}` }}>
                  {post.title}
                </Link>
              </Typography>
              <Typography
                className={classes.title}
                color='textSecondary'
                gutterBottom
              >
                Owner:
              </Typography>
              <Typography className={classes.pos} color='textSecondary'>
                {post.owner}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ));
    }
  };

  return (
    <Grid container spacing={1}>
      {displayPosts()}
    </Grid>
  );
};

export default Posts;
