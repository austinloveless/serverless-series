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
  pos: {
    marginBottom: 12,
  },
});
const Blogs = ({ blogs }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      {blogs.map((item) => (
        <Grid item key={item.id}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant='h5' component='h2'>
                <Link to={{ pathname: `/blog/${item.id}` }}> {item.name}</Link>
              </Typography>
              <Typography
                className={classes.title}
                color='textSecondary'
                gutterBottom
              >
                Owner:
              </Typography>
              <Typography className={classes.pos} color='textSecondary'>
                {item.owner}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Blogs;
