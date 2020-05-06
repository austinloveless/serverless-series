// Dependencies
import React, { useEffect, useState } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Typography } from '@material-ui/core';

// Files
import './App.css';
import {
  HomeView,
  BlogView,
  BlogEditView,
  PostView,
  PostEditView,
} from './components/Views';

// Config
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

const App = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    setUser(user.signInUserSession.idToken.payload);
  };

  return (
    <Router>
      {user ? (
        <div className='App'>
          <Typography variant='h1'> Amplify Blogs!</Typography>
          <Route exact path='/' component={() => <HomeView user={user} />} />
          <Route
            exact
            path='/:blogId'
            component={({ match, history }) => (
              <BlogView match={match} history={history} user={user} />
            )}
          />
          <Route
            exact
            path='/:blogId/:postId'
            component={({ match, history }) => (
              <PostView match={match} history={history} user={user} />
            )}
          />
          <Route
            exact
            path='/:blogId/edit/blog'
            component={({ match, history }) => (
              <BlogEditView match={match} history={history} user={user} />
            )}
          />
          <Route
            exact
            path='/:blogId/:postId/edit/post'
            component={({ match, history }) => (
              <PostEditView match={match} history={history} user={user} />
            )}
          />
        </div>
      ) : null}
    </Router>
  );
};

export default withAuthenticator(App, { includeGreetings: true });
