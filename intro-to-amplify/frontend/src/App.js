// Dependencies
import React from 'react';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Typography } from '@material-ui/core';

// Files
import './App.css';
import { BlogView, PostView } from './components/Views';
import Home from './components/Home';

// Config
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Typography variant='h1'> Amplify Blogs!</Typography>
        <Route exact path='/' component={Home} />
        <Route exact path='/:blogId' component={BlogView} />
        <Route exact path='/:blogId/:postId' component={PostView} />
      </div>
    </Router>
  );
};

export default withAuthenticator(App, { includeGreetings: true });
