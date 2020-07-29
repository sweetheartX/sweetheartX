import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav /* Form, FormControl, Button, Container */ } from 'react-bootstrap';

const NavigateBar = () => (
  <Navbar bg="primary" variant="dark">
    {/* Leftside Nav Logo/Link */}
    {/* TODO: Point this href to `/explore` if User is authenticated */}
    <Link to="/">
      <Navbar.Brand>Scratch Project</Navbar.Brand>
    </Link>
    {/* Rightside Nav Links */}
    {/* Set class for Login and Signup button Nav item to `margin-left: auto;` */}
    <Nav className="ml-auto">
      {/* TODO: Remove inline styling in favor of Bootstrap or separate stylesheet */}

      {/* temporary link to render submit idea page */}
      <Link to="/submit">
        <Nav.Link href="/submit" style={{ color: 'white' }}>
          Submit Idea
        </Nav.Link>
      </Link>
      <Link to="/login">
        <Nav.Link href="/login" style={{ color: 'white' }}>
          Login
        </Nav.Link>
      </Link>
      <Link to="/signup">
        <Nav.Link href="/signup" style={{ color: 'white' }}>
          Signup
        </Nav.Link>
      </Link>
    </Nav>
  </Navbar>
);

// // Search Bar Component
// < Form inline >
//   <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//   <Button variant="outline-light">Search</Button>
// </Form >
export default NavigateBar;
