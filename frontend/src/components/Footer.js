import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#140A00" }}>
      <Container>
        <Row>
          <Col className="text-center py-3 text-light ">
            Copyright &copy; Pet shop
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
