import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import PostForm from '../../Children/PostForm';
import { listPosts, listBlogs, getUser } from '../../../graphql/queries';

const PostCreate = ({ history, user, loggedInUserData }) => {
  const [posts, setPosts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [allFollowersData, setAllFollowersData] = useState([]);
  useEffect(() => {
    handleGetPost();
    handleListBlogs();
    const handleGetAllUserNotifications = async () => {
      if (loggedInUserData.followers && loggedInUserData.followers.length) {
        await Promise.all(
          loggedInUserData.followers.map(async (follower) => {
            const { data } = await API.graphql(
              graphqlOperation(getUser, {
                username: follower.username,
              })
            );
            setAllFollowersData(data.getUser);
          })
        );
      }
    };
    handleGetAllUserNotifications();
  }, [user.email, loggedInUserData.followers]);

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
        allFollowersData={allFollowersData}
        setPosts={setPosts}
        history={history}
        blogs={blogs}
      />
    </div>
  );
};

export default PostCreate;
