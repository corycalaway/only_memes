import React from "react";
import { Container, Row, Col, Jumbotron, Card } from "react-bootstrap";

const RenderUser = (params) => {
  let { user } = params;
  console.log(user);
  return (
    <>
      {user ? (
        <Container fluid>
          <Jumbotron>
            <Row className="justify-content-center">
              <Col className="text-center">
                <h3>Checking out {user.username}'s memes</h3>
              </Col>
            </Row>
            <Row className="justify-content-center">
              {user.memes.map((meme) => (
                <Card key={meme._id} style={{ width: "20rem", margin: "1rem" }}>
                  <Card.Body>
                    <Card.Img variant="top" src={meme.image} />
                    <Card.Body>
                      <Card.Title>{meme.title}</Card.Title>
                      <Card.Text>Rarity: {meme.rarity}</Card.Text>
                      <Card.Text>Category: {meme.category}</Card.Text>
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

export default RenderUser;
