import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavigateBar = () => (
  <Navbar bg="primary" variant="dark">
    {/* TODO: Point this href to `/explore` if User is authenticated */}
    <Link to="/">
      <Navbar.Brand>Scratch Project</Navbar.Brand>
    </Link>

    {/* Set class for Login and Signup button Nav item to `margin-left: auto;` */}
    <Nav className="ml-auto">
      {/* TODO: Remove inline styling in favor of separate stylesheet */}

      {/* nav-link class mimics styling without nesting anchor tags */}
      <Link to="/submit">
        <span className="nav-link" style={{ color: 'white' }}>
          Submit Idea
        </span>
      </Link>
      <Link to="/login">
        <span className="nav-link" style={{ color: 'white' }}>
          Login
        </span>
      </Link>
      <Link to="/signup">
        <span className="nav-link" style={{ color: 'white' }}>
          Signup
        </span>
      </Link>
    </Nav>
  </Navbar>
);

// SAFE TO DELETE?
// // Search Bar Component
// < Form inline >
//   <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//   <Button variant="outline-light">Search</Button>
// </Form >

export default NavigateBar;
