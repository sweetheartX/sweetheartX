import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../styles/login-signup.scss';

const EditProfile = (props) => {
  const { authStatus } = props;

  const [profileInputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    about: '',
    profilepic: '',
    githubHandle: '',
    linkedIn: '',
    personalPage: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [editStatus, setEditStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      about,
      profilepic,
      githubHandle,
      linkedIn,
      personalPage,
    } = profileInputs;

    const body = {
      firstName,
      lastName,
      about,
      profilepic,
      githubHandle,
      linkedIn,
      personalPage,
    };

    const response = await fetch('/api/editprofile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.status === 200) {
      setEditStatus(true);
    } else setErrorMsg('Error: Profile edits could not be updated.');
  };

  const setInput = (e) => {
    setInputs({
      ...profileInputs,
      [e.target.id]: e.target.value,
    });
  };

  return editStatus || authStatus.isLoggedIn ? (
    <Redirect
      to={{
        pathname: '/editprofile',
      }}
    />
  ) : (
    <>
      <center>
        <h4>Edit Profile:</h4>
      </center>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control required placeholder="First Name" type="firstname" onChange={setInput} />
        </Form.Group>

        <Form.Group controlId="lastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control required placeholder="Last Name" type="lastname" onChange={setInput} />
        </Form.Group>

        <Form.Group controlId="about">
          <Form.Label>About</Form.Label>
          <Form.Control placeholder="About" type="about" onChange={setInput} />
        </Form.Group>

        <Form.Group controlId="profilepic">
          <Form.Label>Upload Profile Image: </Form.Label>
          <Form.Text className="text-muted">for now, put a image source url</Form.Text>
          <Form.Control size="lg" type="text" onChange={setInput} />
        </Form.Group>

        <Form.Group controlId="githubHandle">
          <Form.Label>GitHub Handle</Form.Label>
          <Form.Control
            required
            placeholder="GitHub Handle"
            type="githubhandle"
            onChange={setInput}
          />
        </Form.Group>

        <Form.Group controlId="linkedIn">
          <Form.Label>Linked In</Form.Label>
          <Form.Control required placeholder="Linked In" type="linkedin" onChange={setInput} />
        </Form.Group>

        <Form.Group controlId="personalPage">
          <Form.Label>Personal Page</Form.Label>
          <Form.Control
            required
            placeholder="Personal Page"
            type="personalpage"
            onChange={setInput}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
      <div className="error-msg">{errorMsg}</div>
    </>
  );
};

export default EditProfile;
