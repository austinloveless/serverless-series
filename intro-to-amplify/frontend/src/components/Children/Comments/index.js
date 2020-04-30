import React from 'react';
import { Typography, makeStyles, Divider } from '@material-ui/core';

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
});

const Comments = ({ comments }) => {
  const classes = useStyles();

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Typography>{comment.content}</Typography>
          <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom
          >
            Owner:
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            {comment.owner}
          </Typography>
          <Divider />
          <br />
        </div>
      ))}
    </div>
  );
};

export default Comments;
