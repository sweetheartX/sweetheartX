import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const Landing = () => (
  <Container fluid className="container">
    <div className="mt-5">
      <h1 className="d-flex justify-content-center"> Welcome to Scratch Project </h1>
      <br />
      <h2 className="mb-5 d-flex justify-content-center">
        {' '}
        A place where developers make their dreams come true{' '}
      </h2>
      <br />
    </div>
    <div className="mt-5 d-flex justify-content-center">
      <Link to="/explore">
        <Button size="lg" variant="outline-primary">
          Start Exploring
        </Button>
      </Link>
    </div>
  </Container>
);

export default Landing;
