import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../styles/login-signup.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

const Signup = (props) => {
  const { authStatus, setAuthStatus } = props;

  const [registrationInputs, setRegistrationInputs] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [registerStatus, setRegisterStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, email, confirmPassword, firstname, lastname } = registrationInputs;
    if (password !== confirmPassword) return setErrorMsg("Passwords don't match!");

    const body = {
      username,
      password,
      email,
      firstname,
      lastname,
    };

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.status === 200) {
      setRegisterStatus(true);
      setAuthStatus({ isLoggedIn: true, username });
      setRegistrationInputs({ password: '' }); // pw changed back to empty string in state after sending info to db
    } else setErrorMsg('New user could not be created - duplicate username/email');
  };

  const setInput = (e) => {
    setRegistrationInputs({
      ...registrationInputs,
      [e.target.id]: e.target.value,
    });
  };

  return registerStatus || authStatus.isLoggedIn ? (
    <Redirect
      to={{
        pathname: '/explore',
      }}
    />
  ) : (
    <div className="signup-container">
      <div className="login-box">
        <center>
          <h4>Welcome!</h4>
        </center>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control required placeholder="Username" type="username" onChange={setInput} />
          </Form.Group>
          <Row>
          <Col>
          <Form.Group controlId="firstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control required placeholder="First Name" type="firstname" onChange={setInput} />
          </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="lastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control required placeholder="Last Name" type="lastname" onChange={setInput} />
          </Form.Group>
          </Col>
          </Row>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="Email" type="email" onChange={setInput} />
          </Form.Group>

          <Row>
            <Col>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control required placeholder="Password" type="password" onChange={setInput} />
          </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              placeholder="Confirm Password"
              type="password"
              onChange={setInput}
            />
          </Form.Group>
          </Col>
          </Row>

          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
        <div className="error-msg">{errorMsg}</div>
      </div>
    </div>
  );
};

export default Signup;
