import React from 'react';

const Comments = ({ comments }) => {
  return (
    <div>
      {comments.map((item, i) => (
        <div key={item.id}>{item.content}</div>
      ))}
    </div>
  );
};

export default Comments;
