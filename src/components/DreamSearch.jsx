import React from 'react';
import Form from 'react-bootstrap/Form';

const DreamSearch = ({ onChange }) => (
  <Form>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>
        <h1>
          May all your <span style={{ color: 'red' }}>dreams</span> come true.
        </h1>
      </Form.Label>
      <Form.Control
        placeholder="Manifest your dreams..."
        size="lg"
        type="text"
        onChange={onChange}
      />
      {/* Button not needed with live search refresh */}
      {/* <Button variant="primary" type="submit" className='mt-2'></Button> */}
    </Form.Group>
  </Form>
);

export default DreamSearch;
