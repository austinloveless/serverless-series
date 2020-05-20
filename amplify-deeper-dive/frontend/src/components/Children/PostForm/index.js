// Dependencies
import React, { useState } from 'react';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import {
  TextField,
  Button,
  makeStyles,
  Switch,
  FormControlLabel,
  FormHelperText,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import { PhotoPicker } from 'aws-amplify-react';

// Files
import { createPost, updateUser } from '../../../graphql/mutations';
import useForm from '../../../hooks/useForm';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const INITIAL_POST_STATE = {
  title: '',
  content: '',
  writers: [],
  editors: [],
  postBlogId: '',
};
const PostForm = ({
  posts,
  loggedInUserData,
  setPosts,
  user,
  history,
  blogs,
  allFollowersData,
}) => {
  const { values, handleChanges } = useForm(INITIAL_POST_STATE);
  const { title, content, editors, writers, postBlogId } = values;
  const [state, setState] = useState({
    draft: false,
  });
  const [file, setFile] = useState({});
  const classes = useStyles();

  const handleFileChange = (data) => {
    setFile(data.file);
  };

  const handleAddPost = async (event) => {
    event.preventDefault();
    const imageTitle = title.replace(/\s+/g, '-');

    const payload = {
      title,
      content,
      postBlogId,
      postUserId: user.email,
      thumbnail: `thumbnails/public/${user.email}/postImages/${imageTitle}/${file.name}`,
      originalImage: `${user.email}/postImages/${imageTitle}/${file.name}`,
      editors: typeof editors === 'string' ? editors.split(',') : editors,
      writers: typeof writers === 'string' ? writers.split(',') : writers,
      draft: state.draft === false ? true : false,
    };
    const { data } = await API.graphql(
      graphqlOperation(createPost, { input: payload })
    );
    const newPost = data.createPost;
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);

    if (data.createPost) {
      const notifications = [];
      if (
        allFollowersData.notifications &&
        allFollowersData.notifications.length
      ) {
        allFollowersData.notifications.map((notification) => {
          return notifications.push(notification);
        });
        const newNotificationObject = {
          type: 'post',
          user: user.email,
          id: newPost.id,
        };
        notifications.push(newNotificationObject);

        await Promise.all(
          loggedInUserData.followers.map(async (follower) => {
            const updateUserPayload = {
              id: follower.id,
              username: follower.username,
              notifications,
            };
            await API.graphql(
              graphqlOperation(updateUser, { input: updateUserPayload })
            );
          })
        );
      } else {
        const newNotificationObject = {
          type: 'post',
          user: user.email,
          id: newPost.id,
        };
        notifications.push(newNotificationObject);

        await Promise.all(
          loggedInUserData.followers.map(async (follower) => {
            const updateUserPayload = {
              id: follower.id,
              username: follower.username,
              notifications,
            };
            await API.graphql(
              graphqlOperation(updateUser, { input: updateUserPayload })
            );
          })
        );
      }
      await Storage.put(
        `${user.email}/postImages/${imageTitle}/${file.name}`,
        file
      );
    }
    history.push('/');
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <form
        onSubmit={handleAddPost}
        className={classes.root}
        autoComplete='off'
      >
        <br />
        <div>
          <TextField
            id='outlined-basic'
            label='Title'
            variant='outlined'
            name='title'
            value={title}
            onChange={(e) => {
              handleChanges(e);
            }}
          />
        </div>

        <div>
          <TextField
            id='standard-multiline-flexible'
            label='Content'
            variant='outlined'
            name='content'
            multiline
            rows={4}
            value={content}
            onChange={(e) => {
              handleChanges(e);
            }}
          />
        </div>
        <div>
          <TextField
            id='outlined-basic'
            label='Editors'
            variant='outlined'
            name='editors'
            value={editors}
            onChange={(e) => handleChanges(e)}
          />
          <FormHelperText>
            Editors can review submissions, add stories, edit and publish
            submitted drafts, and remove any stories from this Blog.
          </FormHelperText>
          <TextField
            id='outlined-basic'
            label='Writers'
            variant='outlined'
            name='writers'
            value={writers}
            onChange={(e) => handleChanges(e)}
          />
          <FormHelperText>
            Add new writers. Writers can submit their stories and remove them
            from this Blog.
          </FormHelperText>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-simple-select-helper-label'>
              Add to Blog
            </InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={postBlogId}
              name='postBlogId'
              onChange={(e) => handleChanges(e)}
            >
              {blogs.map((blog) => (
                <MenuItem key={blog.id} value={blog.id}>
                  {blog.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Add (or change) your post to a blog</FormHelperText>
          </FormControl>
        </div>
        <div>
          <FormControlLabel
            control={
              <Switch
                checked={state.draft}
                onChange={handleChange}
                name='draft'
                color='primary'
              />
            }
            label={
              state.draft === false ? 'Saving as Draft' : 'Publishing Post'
            }
          />
        </div>
        <br />
        <PhotoPicker preview onPick={(data) => handleFileChange(data)} />

        <Button variant='contained' color='primary' type='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
