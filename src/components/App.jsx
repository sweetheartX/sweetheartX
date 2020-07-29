/* eslint-disable react/jsx-fragments */
import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import Landing from './Landing';
import Explore from './Explore';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import NavigateBar from './NavigateBar';
import IdeaPage from './IdeaPage';
import SubmitIdea from './SubmitIdea';

// styling
import '../../node_modules/bootstrap/dist/css/bootstrap.css'; // necessary to import this entire file?

const App = () => {
  const [authStatus, setAuthStatus] = useState({
    isLoggedIn: false,
    username: '',
  });

  return (
    <Router>
      {/* Using Fragment rather than native div to avoid React warnings */}
      <Fragment>
        {/* Navigation Bar is ever-present */}
        <NavigateBar authStatus={authStatus} />
        {/* Use the first Route whose path matches current URL */}
        <Switch>
          {/* Render given component if given path matches current URL */}
          {/* <Route exact path="/" component={Landing} /> */}
          <Route
            exact
            path="/"
            render={() => <Landing authStatus={authStatus} />}
          />
          <Route
            exact
            path="/login"
            render={() => (
              <Login authStatus={authStatus} setAuthStatus={setAuthStatus} />
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => (
              <Signup authStatus={authStatus} setAuthStatus={setAuthStatus} />
            )}
          />
          <Route
            exact
            path="/explore"
            render={() => <Explore authStatus={authStatus} />}
          />
          <Route exact path="/idea" component={IdeaPage} />
          <Route
            exact
            path="/submit"
            render={() => <SubmitIdea authStatus={authStatus} />}
          />
          <Route
            exact
            path="/profile"
            render={() => <Profile authStatus={authStatus} />}
          />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
