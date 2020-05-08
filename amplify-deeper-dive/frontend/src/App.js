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
  UserProfileView,
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
          {/* Home Route */}
          <Route exact path='/' component={() => <HomeView user={user} />} />

          {/* Blog Routes */}
          <Route
            exact
            path='/blog/:blogId'
            component={({ match, history }) => (
              <BlogView match={match} history={history} user={user} />
            )}
          />
          <Route
            path='/blog/:blogId/edit/'
            component={({ match, history }) => (
              <BlogEditView match={match} history={history} user={user} />
            )}
          />

          {/* Post Routes */}
          <Route
            exact
            path='/blog/:blogId/post/:postId'
            component={({ match, history }) => (
              <PostView match={match} history={history} user={user} />
            )}
          />
          <Route
            path='/blog/:blogId/post/:postId/edit/'
            component={({ match, history }) => (
              <PostEditView match={match} history={history} user={user} />
            )}
          />

          {/* User Routes */}
          <Route
            exact
            path='/user-profile'
            component={({ match, history }) => (
              <UserProfileView match={match} history={history} user={user} />
            )}
          />
        </div>
      ) : null}
    </Router>
  );
};

export default withAuthenticator(App, { includeGreetings: true });
