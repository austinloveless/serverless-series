// Dependencies
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import {
  Typography,
  Card,
  Grid,
  CardContent,
  makeStyles,
} from '@material-ui/core';
import { S3Image } from 'aws-amplify-react';
import { Link } from 'react-router-dom';

// Files
import { listPosts } from '../../../graphql/queries';

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

const PostsListView = () => {
  const [posts, setPosts] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    handleGetPost();
  }, []);

  const handleGetPost = async () => {
    const { data } = await API.graphql(graphqlOperation(listPosts));

    setPosts(data.listPosts.items);
  };

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      style={{ marginTop: 50 }}
    >
      {posts.map((post) => (
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
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PostsListView;
