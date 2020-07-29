import React from 'react';
import Form from 'react-bootstrap/Form';

const DreamSearch = ({ onChange }) => (
  <Form>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>
        <h1>{' May your dream come true '}</h1>
      </Form.Label>
      <Form.Control placeholder="Search your dream..." size="lg" type="text" onChange={onChange} />
      {/* Button not needed with live search refresh */}
      {/* <Button variant="primary" type="submit" className='mt-2'></Button> */}
    </Form.Group>
  </Form>
);

export default DreamSearch;
