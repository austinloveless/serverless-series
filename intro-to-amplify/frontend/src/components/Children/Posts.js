import React from 'react';
import { Link } from 'react-router-dom';
const Posts = ({ posts, blog }) => {
  return (
    <div>
      {posts.map((item, i) => (
        <div key={item.id}>
          <Link to={{ pathname: `/blog/${blog.id}/post/${item.id}` }}>
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;
