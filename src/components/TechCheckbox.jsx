import React from 'react';
import Form from 'react-bootstrap/Form';

const TechCheckbox = ({ name, onTechFilter }) => (
  <Form key={name}>
    <div key="checkbox" className="mb-2 mt-2 ml-3">
      <Form.Check type="checkbox">
        <Form.Check.Input isValid type="checkbox" value={name} onClick={onTechFilter} />
        <Form.Check.Label className="ml-2">
          {' '}
          <h4 style={{ color: '#5e93a5' }}>{name}</h4>{' '}
        </Form.Check.Label>
      </Form.Check>
    </div>
  </Form>
);

export default TechCheckbox;
