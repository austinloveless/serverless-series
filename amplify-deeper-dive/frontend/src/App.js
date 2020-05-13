// Dependencies
import React, { useEffect, useState } from 'react';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Files
import './App.css';
import {
  HomeView,
  BlogView,
  BlogEditView,
  PostView,
  PostEditView,
  UserProfileView,
  UserProfileEditView,
  ListPostsView,
  ListBlogsView,
} from './components/Views';
import CreateUser from './components/Children/CreateUser';

import { getUser } from './graphql/queries';

// Config
import aws_exports from './aws-exports';
import SideNav from './components/Children/SideNav';
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
            <Route exact path='/' component={() => <HomeView user={user} />} />

            {/* Blog Routes */}
            <Route
              exact
              path='/blogs'
              component={() => <ListBlogsView user={user} />}
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
              path='/posts'
              component={() => <ListPostsView user={user} />}
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
