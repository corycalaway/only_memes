import React, { useState } from "react";
import { Form, Button, Container, Row, Jumbotron, Card } from "react-bootstrap";
import { LOGIN } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";

const Login = () => {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    console.log(Auth.loggedIn())
    event.preventDefault();
    try {
      console.log("hi");
      console.log(formState.username, formState.password);
      const mutationResponse = await login({
        variables: {
          username: formState.username,
          password: formState.password,
        },
      });
      console.log(mutationResponse);
      const token = mutationResponse.data.login.token;
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
              <h3>Login.</h3>
            </Row>
            <Row className="justify-content-center">
              <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter your username."
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password."
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {error ? (
                  <div>
                    <p>The provided credentials are incorrect!</p>
                  </div>
                ) : null}

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

export default Login;
