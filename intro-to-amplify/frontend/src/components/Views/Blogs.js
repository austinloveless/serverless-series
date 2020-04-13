// Dependencies
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

// Files
import { getBlog } from '../../graphql/queries';
import { updateBlog, deleteBlog, createPost } from '../../graphql/mutations';
import Posts from '../Children/Posts';

const Blog = ({ match, history }) => {
  const [blog, setBlog] = useState([]);
  const [blogId, setBlogId] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState('');
  const [addPost, setAddPost] = useState(false);

  useEffect(() => {
    handleGetBlog();
  }, []);

  const handleGetBlog = async () => {
    const { data } = await API.graphql(
      graphqlOperation(getBlog, {
        id: match.params.blogId,
      })
    );
    setBlog(data.getBlog);
    setPosts(data.getBlog.posts.items);
  };

  const handleDeleteBlog = async (id) => {
    const payload = { id };
    await API.graphql(graphqlOperation(deleteBlog, { input: payload }));
    history.push('/');
  };

  const handleSetBlog = ({ name, id }) => {
    setBlog(name);
    setBlogId(id);
    setIsUpdate(true);
  };

  const handleUpdateBlog = async (event) => {
    event.preventDefault();
    const payload = { id: blogId, name: blog };
    await API.graphql(graphqlOperation(updateBlog, { input: payload }));
    handleGetBlog();
    setBlog('');
    setIsUpdate(false);
  };

  const handleAddPost = async (event) => {
    event.preventDefault();
    const payload = { title: post, postBlogId: blog.id };
    const { data } = await API.graphql(
      graphqlOperation(createPost, { input: payload })
    );
    const newPost = data.createPost;
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    setPost('');
  };

  return (
    <div>
      {isUpdate ? (
        <form onSubmit={handleUpdateBlog}>
          <input
            placeholder='Write your blog'
            type='text'
            value={blog}
            onChange={({ target }) => setBlog(target.value)}
          />
          <button type='submit'>Update</button>
        </form>
      ) : null}

      {addPost ? (
        <form onSubmit={handleAddPost}>
          <input
            placeholder='Write your Post'
            type='text'
            value={post}
            onChange={({ target }) => setPost(target.value)}
          />
          <button type='submit'>Add</button>
        </form>
      ) : null}

      <div>
        <div key={blog.id}>
          <h2 onClick={() => handleSetBlog(blog)}>{blog.name}</h2>
          <button onClick={() => handleDeleteBlog(blog.id)}>
            <span style={{ color: 'red' }}>&times;</span>
          </button>
          <br />
          <br />

          <button onClick={() => setAddPost(true)}>Add Post</button>
          <Posts posts={posts} blog={blog} />
        </div>
      </div>
    </div>
  );
};

export default Blog;
