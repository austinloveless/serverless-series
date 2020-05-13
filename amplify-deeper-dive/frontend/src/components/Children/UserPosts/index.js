import React from 'react';
import { makeStyles, Card, CardContent, Typography } from '@material-ui/core';
import { S3Image } from 'aws-amplify-react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
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
}));

const UserPosts = ({ posts }) => {
  const classes = useStyles();

  return (
    <>
      {posts.items.map((post) => (
        <Card key={post.id} className={classes.root}>
          <Link to={{ pathname: `/blog/${post.postBlogId}/post/${post.id}` }}>
            <CardContent>
              <S3Image imgKey={post.thumbnail} />
              <Typography
                className={classes.title}
                color='textPrimary'
                gutterBottom
              >
                {post.title}
              </Typography>
              <Typography className={classes.pos} color='textSecondary'>
                Status: {post.draft ? 'Draft' : 'Published'}
              </Typography>
            </CardContent>
          </Link>
        </Card>
      ))}
    </>
  );
};

export default UserPosts;
