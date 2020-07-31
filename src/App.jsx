import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Messages from './pages/Messages';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Bio from './pages/Bio';
import NavigateBar from './pages/NavigateBar';
import IdeaPage from './pages/IdeaPage';
import SubmitIdea from './pages/SubmitIdea';
import NoMatch from './pages/NoMatch';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

const App = () => {
  const [authStatus, setAuthStatus] = useState({
    isLoggedIn: false,
    username: 'test',
  });

  useEffect(() => {
    const session = () =>
      fetch('/api/session')
        .then((response) => response.json())
        .then((data) => {
          const { username } = data;
          if (username) setAuthStatus({ isLoggedIn: true, username });
        })
        .catch((err) => console.log(err));

    session();
  }, []);

  return (
    <Router>
      <>
        {/* Navigation Bar is ever-present */}
        <NavigateBar authStatus={authStatus} setAuthStatus={setAuthStatus} />
        {/* Use the first Route whose path matches current URL */}
        <Switch>
          {/* Render given component if given path matches current URL */}
          {/* <Route exact path="/" component={Landing} /> */}
          {/* Using render instead of component prevents lifecycle methods on load */}
          <Route exact path="/" render={() => <Landing authStatus={authStatus} />} />
          <Route
            exact
            path="/login"
            render={() => <Login authStatus={authStatus} setAuthStatus={setAuthStatus} />}
          />
          <Route
            exact
            path="/signup"
            render={() => <Signup authStatus={authStatus} setAuthStatus={setAuthStatus} />}
          />
          <Route exact path="/explore" render={() => <Explore />} />
          <Route exact authStatus={authStatus} component={IdeaPage} path="/idea/:id" />
          <Route exact path="/messages" render={() => <Messages authStatus={authStatus} />} />
          <Route exact path="/submit" render={() => <SubmitIdea authStatus={authStatus} />} />
          <Route exact path="/profile" render={() => <Profile authStatus={authStatus} />} />
          <Route exact path="/editprofile" render={() => <EditProfile authStatus={authStatus} />} />
          <Route exact path="/bio" render={() => <Bio authStatus={authStatus} />} />
          <Route component={NoMatch} />
        </Switch>
      </>
    </Router>
  );
};

export default App;
