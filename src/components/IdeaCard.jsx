import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import '../styles/ideacard.scss';

const IdeaCard = ({ idea }) => {
  const { image, name, description, techstacks, idea_id } = idea;

  return (
    <Card className="m-3" id="card" style={{ width: '20rem' }}>
      <Card.Img src={image} variant="top" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text style={{ fontWeight: 300 }}>{description}</Card.Text>
        <Card.Text style={{ fontSize: 12, fontStyle: 'italic' }}>
          <span style={{ fontSize: 13, fontWeight: 'bold' }}>Tech Stack: </span> <br />
          {techstacks.join(', ')}
        </Card.Text>
        <Link to={`/idea/${idea_id}`}>
          <Button variant="danger"> Find out more </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default IdeaCard;
