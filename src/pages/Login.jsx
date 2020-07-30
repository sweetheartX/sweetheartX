import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import '../styles/login-signup.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

const Login = ({ authStatus, setAuthStatus }) => {
  const { isLoggedIn } = authStatus;

  // used to toggle error message if auth fails
  const [failedLogin, setFailedLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      username,
      password,
    };

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.status === 200) {
      // Reset password in state to empty string as security precaution
      setPassword('');
      setAuthStatus({ isLoggedIn: true, username });
    } else setFailedLogin(true);
  };

  return isLoggedIn ? (
    <Redirect to={{ pathname: '/explore' }} />
  ) : (
    <div className="login-container">
      <div className="login-box">
        <center>
          <h4>Welcome Back!</h4>
        </center>

        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder="Username" type="username" onChange={handleUsername} />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control placeholder="Password" type="password" onChange={handlePassword} />
          </Form.Group>

          <Button type="submit" variant="danger" onClick={handleSubmit}>
            Submit
          </Button>

          {failedLogin && (
            <div className="error-msg">Sorry, your username/password was invalid.</div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Login;
