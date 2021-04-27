import React, { useState } from "react";
import { Form, Button, Container, Row, Jumbotron, Card } from "react-bootstrap";
import { ADD_USER } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password,
          credit: 30,
        },
      });
      console.log(mutationResponse);
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState);
  };

  return (
    <Container fluid>
      <Jumbotron>
        <Row className="justify-content-center">
          <Card style={{ width: "35rem" }}>
            <Row className="justify-content-center">
              <Link to="/signup">SignUp</Link>
            </Row>
            <Row className="justify-content-center">
              <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your preferred username."
                    required
                    name="username"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email."
                    required
                    name="email"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter a password."
                    required
                    name="password"
                    onChange={handleChange}
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
