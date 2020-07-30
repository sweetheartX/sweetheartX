import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

<<<<<<< HEAD
const NavigateBar = () => (
  // <Navbar bg="primary" variant="dark">
  <Navbar className="bg-danger" variant="dark">
    {/* TODO: Point this href to `/explore` if User is authenticated */}
    <Link to="/">
      <Navbar.Brand>sweetheartX</Navbar.Brand>
    </Link>
=======
// need to figure out how to hide/show certain buttons dependent on user's page status
const NavigateBar = ({ authStatus }) => {
  const { isLoggedIn, username } = authStatus;
  const logoRedirect = isLoggedIn ? '/explore' : '/';
>>>>>>> 78403aa680c118a6b83689b62257b3987a7af003

  const styles = { color: 'white' };

  return (
    <Navbar bg="primary" variant="dark">
      {/* TODO: Point this href to `/explore` if User is authenticated */}
      <Link to={logoRedirect}>
        <Navbar.Brand>Scratch Project</Navbar.Brand>
      </Link>
<<<<<<< HEAD
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
=======

      {/* Set class for Login and Signup button Nav item to `margin-left: auto;` */}
      <Nav className="ml-auto">
        {/* TODO: Remove inline styling in favor of separate stylesheet */}
        {/* nav-link class mimics styling without nesting anchor tags */}
        {isLoggedIn ? (
          <>
            <Navbar.Text style={{ fontStyle: 'italic' }}>Welcome, {username}!</Navbar.Text>
            <Link to="/submit">
              <span className="nav-link" style={styles}>
                Submit Idea
              </span>
            </Link>
            <Link to="/profile">
              <span className="nav-link" style={styles}>
                Profile
              </span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <span className="nav-link" style={styles}>
                Login
              </span>
            </Link>
            <Link to="/signup">
              <span className="nav-link" style={styles}>
                Signup
              </span>
            </Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};
>>>>>>> 78403aa680c118a6b83689b62257b3987a7af003

// SAFE TO DELETE?
// // Search Bar Component
// < Form inline >
//   <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//   <Button variant="outline-light">Search</Button>
// </Form >

export default NavigateBar;
