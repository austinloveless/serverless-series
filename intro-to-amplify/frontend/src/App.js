// Dependencies
import React from 'react';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Files
import './App.css';
import Blogs from './components/Views/Blogs';
import ListBlogs from './components/Views/ListBlogs';
import Posts from './components/Views/Posts';

// Config
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

const App = () => {
  return (
    <Router>
      <div className='App'>
        <h1>Amplify Blogs</h1>
        <Route exact path='/' component={ListBlogs} />
        <Route exact path='/blog/:blogId' component={Blogs} />
        <Route exact path='/blog/:blogId/post/:postId' component={Posts} />
      </div>
    </Router>
  );
};

export default withAuthenticator(App, { includeGreetings: true });
