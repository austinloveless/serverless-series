import React from 'react';
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@material-ui/core';
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

const UserPosts = ({ posts, viewDraft }) => {
  const classes = useStyles();

  const displayPosts = () => {
    if (viewDraft === true) {
      const draftedPosts = posts.items.filter((post) => post.draft === true);
      if (draftedPosts) {
        return draftedPosts.map((post) => (
          <Grid item key={post.id} style={{ padding: 10 }}>
            <Card className={classes.root}>
              <CardContent>
                <div>
                  <S3Image imgKey={post.thumbnail} />

                  <Typography variant='h5' component='h2'>
                    <Link
                      to={{
                        pathname: `/blog/${post.postBlogId}/post/${post.id}`,
                      }}
                    >
                      {post.title}
                    </Link>
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ));
      }
    } else {
      const publishedPosts = posts.items.filter((post) => post.draft === false);
      if (publishedPosts) {
        return publishedPosts.map((post) => (
          <Grid item key={post.id} style={{ padding: 10 }}>
            <Card className={classes.root}>
              <CardContent>
                <div>
                  <S3Image imgKey={post.thumbnail} />

                  <Typography variant='h5' component='h2'>
                    <Link
                      to={{
                        pathname: `/blog/${post.postBlogId}/post/${post.id}`,
                      }}
                    >
                      {post.title}
                    </Link>
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ));
      }
    }
  };

  return (
    <Grid container direction='row' justify='center' alignItems='center'>
      {displayPosts()}
    </Grid>
  );
};

export default UserPosts;
