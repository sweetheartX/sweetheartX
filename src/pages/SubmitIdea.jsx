import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';
import SubmitConfirmation from '../components/SubmitConfirmation';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const SubmitIdea = ({ authStatus }) => {
  const { username } = authStatus;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [availableTech, setAvailableTech] = useState([]);

  // FORM VALUES
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [why, setWhy] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [teamNumber, setTeamNumber] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [whenStart, setWhenStart] = useState('');
  const [whenEnd, setWhenEnd] = useState('');

  // Retrieve available tech stacks (for Typeahead) on page load
  useEffect(() => {
    const fetchTechs = async () => {
      const results = await axios.get('/api/submit');
      setAvailableTech(results.data);
    };

    fetchTechs();
  }, []);

  // Submit form data to server
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      description,
      why,
      whenStart,
      whenEnd,
      teamNumber,
      imageURL,
      username,
      techStack: techStack.map(({ tech_id }) => tech_id),
    };

    await axios.post('/api/submit', data);
    setIsSubmitted(true);
  };

  // Update state with user input
  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'name':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'why':
        setWhy(value);
        break;
      case 'who':
        setTeamNumber(value);
        break;
      case 'uploadImage':
        setImageURL(value);
        break;
      default:
        console.log('error updating form values');
    }
  };

  return isSubmitted ? (
    <SubmitConfirmation setIsSubmitted={setIsSubmitted} />
  ) : (
    <Container style={{ marginTop: 50 }}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            {/* WHAT */}
            {/* Name your idea */}
            <Form.Group controlId="name">
              <Form.Label>WHAT</Form.Label>
              <Form.Text className="text-muted">Name your idea</Form.Text>
              <Form.Control name="ideaName" type="text" onChange={handleChange} />
            </Form.Group>

            {/* Describe your idea */}
            <Form.Group controlId="description">
              <Form.Text className="text-muted">Describe your idea</Form.Text>
              <Form.Control type="text" onChange={handleChange} />
            </Form.Group>

            {/* WHY */}
            {/* Why do you feel passionate...? */}
            <Form.Group controlId="why">
              <Form.Label>WHY</Form.Label>
              <Form.Text className="text-muted">
                Why do you feel passionate about this idea?
              </Form.Text>
              <Form.Control type="text" onChange={handleChange} />
            </Form.Group>

            {/* HOW */}
            {/* Choose your tech */}
            <Form.Group>
              <Form.Label>HOW</Form.Label>
              <Form.Text className="text-muted">Choose your tech</Form.Text>
              <Typeahead
                multiple
                id="techStacks"
                labelKey="name"
                options={availableTech}
                selected={techStack}
                onChange={setTechStack}
              />
            </Form.Group>

            {/* WHO */}
            {/* Desired number of teammates */}
            <Form.Group controlId="who">
              <Form.Label>WHO</Form.Label>
              <Form.Text className="text-muted">Desired Number of Teammates</Form.Text>
              <Form.Control type="text" onChange={handleChange} />
            </Form.Group>
          </Col>

          <Col md={6}>
            {/* UPLOAD IMAGE */}
            <Form.Group controlId="uploadImage">
              <Form.Label>Upload Image: </Form.Label>
              <Form.Text className="text-muted">for now, put a image source url</Form.Text>
              <Form.Control size="lg" type="text" onChange={handleChange} />
            </Form.Group>

            {/* WHEN */}
            {/* Start Date */}
            <Form.Group controlId="whenStart">
              <Form.Label>WHEN</Form.Label>
              <Form.Text className="text-muted">
                What do you want to start?
                <br />
                Note: This is also the date you will stop accepting new teammates.
              </Form.Text>
              <Form.Control type="date" onChange={(e) => setWhenStart(e.target.value)} />
            </Form.Group>

            {/* End Date */}
            <Form.Group controlId="whenEnd">
              <Form.Text className="text-muted">
                When is the expected due date? (optional)
              </Form.Text>
              <Form.Control type="date" onChange={(e) => setWhenEnd(e.target.value)} />
            </Form.Group>

            {/* BUTTONS: Submit / Cancel */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="primary">
                SUBMIT
              </Button>
              <Link to="/explore">
                <Button style={{ marginLeft: 10 }} type="link" variant="outline-primary">
                  CANCEL
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default SubmitIdea;
