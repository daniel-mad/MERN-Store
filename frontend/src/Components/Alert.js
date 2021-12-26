import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertComponet = ({ variant, message }) => {
  return (
    <Alert variant={variant} style={{ marginTop: '2.5rem' }}>
      {message}
    </Alert>
  );
};

export default AlertComponet;
