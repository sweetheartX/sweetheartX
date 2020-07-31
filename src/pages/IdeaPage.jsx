import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Col, Row, Button } from 'react-bootstrap';
import Spinner from '../components/Spinner';
import '../styles/ideapage.scss';

const IdeaPage = ({ match, authStatus }) => {
  const { id } = match.params;
  const [ideaData, setIdeaData] = useState(null);
  const [interested, setInterested] = useState(false);

  useEffect(() => {
    const getIdea = async () => {
      const res = await fetch(`/api/explore/${id}`);
      const parsedIdea = await res.json();
      setIdeaData(parsedIdea);
    };

    getIdea();
  }, []);

  const handleInterestClick = async () => {
    setInterested(true);
    // SHOULD: fire post request with idea & user info
    // TODO: actually build out functionality to email/notify creator
  };

  // LOADING SPINNER WHILE FETCH REQUEST PENDING
  if (!ideaData) return <Spinner />;

  // ERROR HANDLER FOR IDEA FETCH
  if (ideaData.err) return <Container id="idea-wrapper">Could not load idea</Container>;

  // RENDER ON SUCCESFUL IDEA FETCH
  const {
    name,
    description,
    why,
    when_start,
    when_end = null,
    who,
    creator_username,
    image,
    participants,
    techStacks,
    profilepic,
  } = ideaData;

  return (
    <Container id="idea-wrapper">
      <Row>
        <Col lg={7}>
          <h4>WHY</h4>
          <Container>{why}</Container>

          <h4>HOW</h4>
          <Container>
            <h6>Tech Stack</h6>
          </Container>
          <Container>
            <ul>
              {techStacks.map((stack) => (
                <li key={stack.name}>{stack.name}</li>
              ))}
            </ul>
          </Container>

          <h4>WHEN</h4>
          <Container>
            <h6>Start Date: {when_start ? when_start.substring(0, 10) : 'not specified'}</h6>
            {when_end ? <h6>End Date: {when_end.substring(0, 10)}</h6> : null}
          </Container>

          <h4>WHO</h4>
          <Container>
            <h6>Current Teammates - {who} Desired </h6>
            {/* TODO: MAKE EACH LI A LINK TO USER PROFILE */}
            <ul>
              <li className="unstyled-li">
                {/* TODO:CONVERT THE PROFILE PIC IN SCHEMA TO STRING */}
                {/* REFACTOR to url param */}
                <NavLink
                  to={{
                    pathname: '/profile',
                    state: {
                      ideaCreator: creator_username,
                      authStatus,
                    },
                  }}
                >
                  <img alt="avatar" className="prof-pic" src={profilepic} />
                </NavLink>
                {creator_username} (creator)
              </li>
              {participants.map((user) => (
                <li key={user.username} className="unstyled-li">
                  <img alt="avatar" className="prof-pic" src={user.profilepic} />
                  {user.username}
                </li>
              ))}
            </ul>
          </Container>
        </Col>

        <Col lg={5}>
          <Row>
            <Col>
              <h4>{name}</h4>
              <Container>
                <h6>{description}</h6>
              </Container>
            </Col>
          </Row>
          <Row>
            <img alt="project branding" className="mx-auto" id="idea-pic" src={image} />
          </Row>

          <Container>
            <Row className="mx-auto">
              {!interested ? (
                <Button className="m-2" variant="danger" onClick={handleInterestClick}>
                  I'm Interested!
                </Button>
              ) : (
                <Button disabled className="m-2" variant="danger">
                  Idea Creator Notified!
                </Button>
              )}
            </Row>
            <Row className="mx-auto">
              <NavLink to="/explore">
                <Button className="m-2" variant="danger">
                  Back to Explore
                </Button>
              </NavLink>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default IdeaPage;
