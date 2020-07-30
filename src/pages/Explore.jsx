import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import Spinner from '../components/Spinner';
import TechCheckbox from '../components/TechCheckbox';
import DreamSearch from '../components/DreamSearch';
import IdeaCard from '../components/IdeaCard';

const Explore = () => {
  // For techFilter, if user checks off a tech, it gets added to array
  const [techFilter, setTechFilter] = useState([]);
  const [techList, setTechList] = useState([{ tech_id: '', name: '' }]);
  const [query, setQuery] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [response, setResponse] = useState([
    {
      idea_id: '',
      name: '',
      description: '',
      why: '',
      when_start: '',
      when_end: '',
      who: '',
      creator_username: '',
      image: '',
      techstacks: [],
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await axios.get('api/explore');
      setResponse(results.data[0]);
      setTechList(results.data[1]);
      setLoaded(true);
    };

    fetchData();
  }, []);

  // On checkbox click: remove tech from filter list if already added, & vice versa
  const handleTechFilter = (e) => {
    const newTechFilter = techFilter.includes(e.target.value)
      ? techFilter.filter((tech) => tech !== e.target.value)
      : [...techFilter, e.target.value];

    setTechFilter(newTechFilter);
  };

  // If current query string is not a subtring of idea name, remove idea from render
  let sortedIdeas = response.filter(
    (data) => data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1,
  );

  // Filter idea render array on selected tech stacks (if any)
  const len = techFilter.length;
  if (techFilter.length > 0) {
    // Only include ideas that match ALL currently filtered tech stacks
    sortedIdeas = sortedIdeas.filter((idea) => {
      for (let i = 0; i < len; i += 1) {
        if (!idea.techstacks.includes(techFilter[i])) return false;
      }
      return true;
    });
  }

  const explorePage = (
    <Container fluid>
      <Row>
        <Col className="mt-4" lg={2}>
          <Row noGutters>
            {' '}
            <h4 className="mb-4" style={{ fontStyle: 'italic', fontWeight: 400, marginTop: 130 }}>
              {' '}
              Choose your tech stack:{' '}
            </h4>
          </Row>
          <div className="">
            {techList.map(({ name }) => (
              <TechCheckbox key={name} name={name} onTechFilter={handleTechFilter} />
            ))}
          </div>
        </Col>

        <Col className="mt-4" lg={9}>
          <DreamSearch onChange={(e) => setQuery(e.target.value)} />
          <Row>
            {sortedIdeas.map((idea) => (
              <IdeaCard key={idea.idea_id} idea={idea} />
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );

  return !loaded ? <Spinner /> : <> {explorePage} </>;
};

export default Explore;
