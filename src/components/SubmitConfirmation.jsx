import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const SubmitConfirmation = ({ setIsSubmitted }) => (
  <div
    style={{
      marginTop: 50,
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <h1 style={{ textAlign: 'center' }}>You submitted your idea successfully!</h1>
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
      }}
    >
      <Button variant="primary" onClick={() => setIsSubmitted(false)}>
        SUBMIT ANOTHER ONE
      </Button>
      <Link to="/explore">
        <Button style={{ marginLeft: 10 }} type="button" variant="outline-primary">
          GO EXPLORE IDEAS
        </Button>
      </Link>
    </div>
  </div>
);

export default SubmitConfirmation;
