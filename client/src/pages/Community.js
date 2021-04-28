import React, { useState } from "react";
import { Form, Button, Container, Row, Jumbotron, Card } from "react-bootstrap";
import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";

const Community = () => {
  const [formState, setFormState] = useState({ username: "" });

  const { data } = useQuery(QUERY_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let username = formState.username;
    console.log(username);

    if (data) {
      console.log(data);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Container fluid>
      <Jumbotron>
        <Row className="justify-content-center">
          <Card style={{ width: "35rem" }}>
            <Card.Body>
              <Row className="justify-content-center">
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Who are you looking for?</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter a username."
                      onChange={handleChange}
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
            </Card.Body>
          </Card>
        </Row>
      </Jumbotron>
    </Container>
  );
};

export default Community;
