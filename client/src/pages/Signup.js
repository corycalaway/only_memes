import React from "react";
import { Form, Button, Container, Row, Jumbotron, Card } from "react-bootstrap";

const Signup = () => {
  return (
    <Container fluid>
      <Jumbotron>
        <Row className="justify-content-center">
          <Card style={{ width: "35rem" }}>
            <Row className="justify-content-center">
              <h3>SignUp.</h3>
            </Row>
            <Row className="justify-content-center">
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your preferred username."
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email."
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter a password."
                    required
                  />
                </Form.Group>

                <Row className="justify-content-center">
                  <Button variant="dark" type="submit">
                    Submit
                  </Button>
                </Row>
              </Form>
            </Row>
          </Card>
        </Row>
      </Jumbotron>
    </Container>
  );
};

export default Signup;
