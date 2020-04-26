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
      {comments.map((item) => (
        <div key={item.id}>
          <Typography>{item.content}</Typography>
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
          <Divider />
          <br />
        </div>
      ))}
    </div>
  );
};

export default Comments;
