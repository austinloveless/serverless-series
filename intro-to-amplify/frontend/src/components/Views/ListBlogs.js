// Dependencies
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Link } from 'react-router-dom';

// Files
import { listBlogs } from '../../graphql/queries';
import { createBlog } from '../../graphql/mutations';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState('');

  useEffect(() => {
    handleListBlogs();
  }, []);

  const handleListBlogs = async () => {
    const { data } = await API.graphql(graphqlOperation(listBlogs));
    setBlogs(data.listBlogs.items);
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const payload = { name: blog };
    const { data } = await API.graphql(
      graphqlOperation(createBlog, { input: payload })
    );
    const newBlog = data.createBlog;
    const updatedBlogs = [newBlog, ...blogs];
    setBlogs(updatedBlogs);
    setBlog('');
  };

  return (
    <div>
      <form onSubmit={handleAddBlog}>
        <input
          placeholder='Write your blog'
          type='text'
          value={blog}
          onChange={({ target }) => setBlog(target.value)}
        />

        <button type='submit'>Add</button>
      </form>

      <div>
        {blogs.map((item, i) => (
          <div key={item.id}>
            <Link to={{ pathname: `/blog/${item.id}` }}>{item.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
