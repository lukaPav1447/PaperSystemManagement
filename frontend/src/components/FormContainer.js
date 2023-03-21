import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children, marginTop }) => {
  return (
    <Container style={{ marginTop: `${marginTop}` }}>
      <Row className='justify-content-md-center py-3'>
        <Col xs={12} md={5}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
