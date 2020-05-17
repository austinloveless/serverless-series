// Dependencies
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  makeStyles,
} from '@material-ui/core';
import { S3Image } from 'aws-amplify-react';
import { Link } from 'react-router-dom';

// Files
import { listBlogs } from '../../../graphql/queries';

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

const BlogsListView = () => {
  const [blogs, setBlogs] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    handleListBlogs();
  }, []);

  const handleListBlogs = async () => {
    const { data } = await API.graphql(graphqlOperation(listBlogs));
    setBlogs(data.listBlogs.items);
  };

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      style={{ marginTop: 50 }}
    >
      {blogs.map((blog) => (
        <Grid item key={blog.id} style={{ padding: 10 }}>
          <Card className={classes.root}>
            <CardContent>
              <div>
                <S3Image imgKey={blog.thumbnail} />

                <Typography variant='h5' component='h2'>
                  <Link
                    to={{
                      pathname: `/blog/${blog.id}`,
                    }}
                  >
                    {blog.name}
                  </Link>
                </Typography>
                <Typography
                  className={classes.title}
                  color='textSecondary'
                  gutterBottom
                >
                  Author:
                </Typography>
                <Link to={{ pathname: `/user/${blog.owner}` }}>
                  <Typography className={classes.pos} color='textSecondary'>
                    {blog.owner}
                  </Typography>
                </Link>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BlogsListView;
