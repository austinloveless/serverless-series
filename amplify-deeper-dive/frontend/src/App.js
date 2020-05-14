// Dependencies
import React, { useEffect, useState } from 'react';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Files
import './App.css';
import {
  BlogView,
  BlogEditView,
  PostView,
  PostEditView,
  UserProfileView,
  UserProfileEditView,
  PostsListView,
  BlogsListView,
  BlogCreate,
} from './components/Views';
import CreateUser from './components/Children/CreateUser';

import { getUser } from './graphql/queries';

// Config
import aws_exports from './aws-exports';
import SideNav from './components/Children/SideNav';
import PostCreate from './components/Views/Posts/PostCreate';
Amplify.configure(aws_exports);

const App = () => {
  const [user, setUser] = useState([]);
  const [noUser, setNoUser] = useState(false);

  useEffect(() => {
    const getCognitoUser = async () => {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user.signInUserSession.idToken.payload);
      handleUser(user.signInUserSession.idToken.payload);
    };
    getCognitoUser();
  }, []);

  const handleUser = async (payload) => {
    const { data } = await API.graphql(
      graphqlOperation(getUser, {
        username: payload.email,
      })
    );
    if (data.getUser === null) {
      setNoUser(true);
    }
  };

  return (
    <Router>
      {noUser ? (
        <div className='App'>
          <CreateUser user={user} setNoUser={setNoUser} />
        </div>
      ) : (
        <SideNav>
          <div className='App'>
            {/* Home Route */}
            <Route exact path='/' component={() => <PostsListView />} />

            {/* Blog Routes */}
            <Route
              exact
              path='/blogs'
              component={() => <BlogsListView user={user} />}
            />
            <Route
              exact
              path='/new/blog'
              component={({ history }) => (
                <BlogCreate user={user} history={history} />
              )}
            />
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
              path='/new/post'
              component={({ match, history }) => (
                <PostCreate history={history} user={user} />
              )}
            />
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
            <Route
              exact
              path='/user-profile/:username/edit'
              component={({ match, history }) => (
                <UserProfileEditView
                  match={match}
                  history={history}
                  user={user}
                />
              )}
            />
          </div>
        </SideNav>
      )}
    </Router>
  );
};

export default withAuthenticator(App, { includeGreetings: true });
