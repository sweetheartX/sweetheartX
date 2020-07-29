import React from 'react';
import {Jumbotron} from 'react-bootstrap'
// import brokenHeart from '../images/brokenHeart.jpg'
const image = 'https://i.imgur.com/iliJAZF.jpg'

const NoMatch = () => {
  return (
    <Jumbotron fluid className="jumbo">
      <h1>Looks like you wandered away from us</h1>
      </Jumbotron>
    );
}
 
export default NoMatch;