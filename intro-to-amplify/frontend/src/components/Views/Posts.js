// Dependencies
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

// Files
import { getPost } from '../../graphql/queries';
import { updatePost, deletePost, createComment } from '../../graphql/mutations';

const Post = ({ match, history }) => {
  const [post, setPost] = useState([]);
  const [postId, setPostId] = useState('');
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [addComment, setAddComment] = useState(false);

  useEffect(() => {
    handleGetPost();
  }, []);
  const handleGetPost = async () => {
    const { data } = await API.graphql(
      graphqlOperation(getPost, {
        id: match.params.postId,
      })
    );
    setPost(data.getPost);
    setComments(data.getPost.comments.items);
  };

  const handleDeletePost = async (id) => {
    const payload = { id };
    await API.graphql(graphqlOperation(deletePost, { input: payload }));
    history.push('/');
  };

  const handleSetPost = ({ name, id }) => {
    setPost(name);
    setPostId(id);
  };

  const handleUpdatePost = async (event) => {
    event.preventDefault();
    const payload = { id: postId, name: post };
    await API.graphql(graphqlOperation(updatePost, { input: payload }));
    handleGetPost();
    setPost('');
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
    const payload = { content: comment, commentPostId: post.id };
    const { data } = await API.graphql(
      graphqlOperation(createComment, { input: payload })
    );
    const newComment = data.createComment;
    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    setComment('');
  };

  return (
    <div>
      {addComment ? (
        <form onSubmit={handleAddComment}>
          <input
            placeholder='Write your Post'
            type='text'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button type='submit'>Add</button>
        </form>
      ) : null}

      <div>
        <div key={post.id}>
          <h2 onClick={() => handleSetPost(post)}>{post.name}</h2>
          <button onClick={() => handleDeletePost(post.id)}>
            <span style={{ color: 'red' }}>&times;</span>
          </button>
          <button onClick={() => setAddComment(true)}>Add Comment</button>
          <div key={post.id}>
            <li>{post.title}</li>
          </div>
          {comments.map((item, i) => (
            <div key={item.id}>{item.content}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
