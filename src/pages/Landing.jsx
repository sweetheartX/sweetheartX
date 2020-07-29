import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

/*
 * HELPER FUNCTION: nextPath
 * Push `path` to Landing component's destructured `history` prop
 * (provided by invoking withRouter on Landing component before export)
 */
const redirectToPath = (history, path) => {
  history.push(path);
};

const Landing = ({ history }) => (
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
      <Button
        block
        className="w-25"
        size="lg"
        variant="outline-primary"
        onClick={() => redirectToPath(history, '/explore')}
      >
        Start Exploring
      </Button>
    </div>
  </Container>
);

export default withRouter(Landing);
