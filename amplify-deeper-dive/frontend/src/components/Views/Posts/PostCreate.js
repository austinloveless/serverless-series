import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import PostForm from '../../Children/PostForm';
import { listPosts, listBlogs } from '../../../graphql/queries';

const PostCreate = ({ history, user, loggedInUserData }) => {
  const [posts, setPosts] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    handleGetPost();
    handleListBlogs();
  }, [user.email]);

  const handleListBlogs = async () => {
    const { data } = await API.graphql(graphqlOperation(listBlogs));
    setBlogs(data.listBlogs.items);
  };

  const handleGetPost = async () => {
    const { data } = await API.graphql(graphqlOperation(listPosts));
    setPosts(data.listPosts.items);
  };
  return (
    <div>
      <PostForm
        user={user}
        loggedInUserData={loggedInUserData}
        posts={posts}
        setPosts={setPosts}
        history={history}
        blogs={blogs}
      />
    </div>
  );
};

export default PostCreate;
