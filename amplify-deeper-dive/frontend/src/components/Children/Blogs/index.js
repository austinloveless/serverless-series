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
    width: 350,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    width: 300,
    height: 250,
  },
});

const Blogs = ({ blogs }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      {blogs.map((blog) => (
        <Grid item key={blog.id} style={{ padding: 10 }}>
          <Card className={classes.root}>
            <CardContent>
              <S3Image className={classes.media} imgKey={blog.thumbnail} />

              <Typography variant='h5' component='h2'>
                <Link to={{ pathname: `/blog/${blog.id}` }}> {blog.name}</Link>
              </Typography>
              <Typography
                className={classes.title}
                color='textSecondary'
                gutterBottom
              >
                Owner:
              </Typography>
              <Typography className={classes.pos} color='textSecondary'>
                {blog.owner}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Blogs;
