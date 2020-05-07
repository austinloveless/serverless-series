import React from 'react';
import { Typography, makeStyles, Divider, Button } from '@material-ui/core';

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
});

const Comments = ({ comments, handleDeleteComment, user, postOwner }) => {
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
          {user.email === comment.owner || user.email === postOwner ? (
            <Button
              color='secondary'
              onClick={() => handleDeleteComment(comment.id)}
              variant='outlined'
            >
              <span style={{ color: 'red' }}>Delete</span>
            </Button>
          ) : null}

          <Divider />
          <br />
        </div>
      ))}
    </div>
  );
};

export default Comments;
