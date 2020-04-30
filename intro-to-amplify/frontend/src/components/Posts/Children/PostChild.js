import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Grid,
} from '@material-ui/core';

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

const Posts = ({ posts, blog }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      {posts.map((post) => (
        <Grid item key={post.id}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant='h5' component='h2'>
                <Link to={{ pathname: `/${blog.id}/${post.id}` }}>
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
      ))}
    </Grid>
  );
};

export default Posts;
