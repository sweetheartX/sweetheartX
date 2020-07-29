import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const IdeaCard = ({ idea, authStatus }) => (
  <Card className="m-3" style={{ width: '20rem' }}>
    <Card.Img src={idea.image} variant="top" />
    <Card.Body>
      <Card.Title>{idea.name}</Card.Title>
      <Card.Text style={{ fontWeight: 300 }}>{idea.description}</Card.Text>
      <Card.Text style={{ fontSize: 12, fontStyle: 'italic' }}>
        <span style={{ fontSize: 13, fontWeight: 'bold' }}>Tech Stack: </span> <br />
        {idea.techstacks.join(', ')}
      </Card.Text>
      <Link
        to={{
          pathname: '/idea',
          state: {
            idea_id: idea.idea_id,
            authStatus,
          },
        }}
      >
        <Button variant="primary"> Find out more </Button>
      </Link>
    </Card.Body>
  </Card>
);

export default IdeaCard;
