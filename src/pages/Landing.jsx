import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import logo from '../assets/logo.png';

const Landing = () => (
  <Container fluid className="container">
    <div className="mt-5">
      <h1 className="d-flex justify-content-center"> Welcome to </h1>
      <img alt="" className="d-flex justify-content-center img-fluid" src={logo} />
      <h2 className="mb-5 d-flex justify-content-center text-center">
        where
        <h2 className="text-danger">&nbsp; (developers) &nbsp;</h2>
        make their dreams come true.
      </h2>
    </div>
    <div className="mt-5 d-flex justify-content-center">
      <Link to="/explore">
        <Button size="lg" variant="danger">
          Start Exploring
        </Button>
      </Link>
    </div>
  </Container>
);

export default Landing;
