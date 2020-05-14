// Dependencies
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

// Files
import { listBlogs } from '../../../graphql/queries';
import BlogForm from '../../Children/BlogForm';

const BlogCreate = ({ user, history }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    handleListBlogs();
  }, []);

  const handleListBlogs = async () => {
    const { data } = await API.graphql(graphqlOperation(listBlogs));
    setBlogs(data.listBlogs.items);
  };

  return (
    <div>
      <BlogForm
        user={user}
        blogs={blogs}
        setBlogs={setBlogs}
        history={history}
      />
    </div>
  );
};

export default BlogCreate;
