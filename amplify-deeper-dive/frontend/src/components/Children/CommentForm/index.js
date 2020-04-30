// Dependencies
import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { TextField, Button } from '@material-ui/core';

// Files
import { createComment } from '../../../graphql/mutations';

const CommentForm = ({ setComments, comments, post, setCreateComment }) => {
  const [commentInput, setCommentInput] = useState('');

  const handleAddComment = async (event) => {
    event.preventDefault();
    const payload = { content: commentInput, commentPostId: post.id };
    const { data } = await API.graphql(
      graphqlOperation(createComment, { input: payload })
    );
    const newComment = data.createComment;
    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    setCommentInput('');
    setCreateComment(false);
  };

  return (
    <div>
      <form onSubmit={handleAddComment}>
        <br />
        <TextField
          id='outlined-basic'
          label='Create Comment'
          variant='outlined'
          value={commentInput}
          onChange={({ target }) => setCommentInput(target.value)}
        />
        <br />
        <br />
        <Button variant='contained' color='primary' type='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;
