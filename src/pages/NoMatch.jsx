import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap'
// // import brokenHeart from '../images/brokenHeart.jpg'
// const image = 'https://i.imgur.com/iliJAZF.jpg'
const style = {
  backgroundImage: `url(https://i.pinimg.com/originals/e6/c1/a9/e6c1a9c51db5983bc88100648d5f3dfb.jpg)`,
  backgroundPosition: 'right bottom 500px',
  color: '#f8f8ff',
}

const NoMatch = () => {
  return (
    <Jumbotron fluid className="jumbo" style={style}>
      <Container>
      <h1>You're breaking my heart</h1>
      <h1>Come back to SWEethearts!!</h1>
      </Container>
      </Jumbotron>
    );
}
 
export default NoMatch;