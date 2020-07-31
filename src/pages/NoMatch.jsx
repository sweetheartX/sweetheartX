import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
// // import brokenHeart from '../images/brokenHeart.jpg'
// const image = 'https://i.imgur.com/iliJAZF.jpg'
const style = {
  backgroundColor: '#dc3545',
  backgroundPosition: 'right bottom 500px',
  color: '#f8f8ff',
};

const NoMatch = () => (
  <Jumbotron fluid className="jumbo" style={style}>
    <Container>
      <h1>Don't go breaking my {'<3'}</h1>
      <h1>Come back sweetheart!</h1>
    </Container>
  </Jumbotron>
);

export default NoMatch;
