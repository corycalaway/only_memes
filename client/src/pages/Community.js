import React, { useState } from "react";
import { Form, Button, Container, Row, Jumbotron, Card } from "react-bootstrap";
import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";

const Community = (params) => {
  const [formState, setFormState] = useState({ username: "" });

  let username;
  let usernames;
  let userIndex;
  let searchedUser;

  const { data } = useQuery(QUERY_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    username = formState.username;

    if (data) {
      usernames = data.users.map((user) => {
        return user.username;
      });
      userIndex = usernames.indexOf(username);
      console.log(data.users[userIndex]);
      searchedUser = data.users[userIndex];
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
    <>
      <Container fluid>
        <Jumbotron>
          <Row className="j</Jumbotron>ustify-content-center">
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

      {searchedUser ? (
        <Container fluid>
          <Jumbotron>
            <Row className="justify-content-center">
              {searchedUser.memes.map((meme) => (
                <Card key={meme._id} style={{ width: "20rem", margin: "1rem" }}>
                  <Card.Body>
                    <Card.Img variant="top" src={meme.image} />
                    <Card.Body>
                      <Card.Title>{searchedUser.meme.title}</Card.Title>
                      <Card.Text>Rarity: {searchedUser.meme.rarity}</Card.Text>
                      <Card.Text>
                        Category: {searchedUser.meme.category}
                      </Card.Text>
                    </Card.Body>
                  </Card.Body>
                </Card>
              ))}
            </Row>
          </Jumbotron>
        </Container>
      ) : (
        <Container fluid>
          <Jumbotron>
            <Row className="justify-content-center">
              <h3>No user with that username found!</h3>
            </Row>
          </Jumbotron>
        </Container>
      )}
    </>
  );
};

export default Community;
