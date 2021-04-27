import React from "react";
import { QUERY_ME } from "../utils/queries";
import { Container, Row, Jumbotron, Card } from "react-bootstrap";
import { useQuery } from "@apollo/client";

function Profile() {
  const { data } = useQuery(QUERY_ME);
  let user;
  let memes;

  if (data) {
    user = data.me;
    memes = user.memes;
    console.log(user);
  }

  return (
    <>
      {user ? (
        <>
          <Jumbotron>
            <h3>
              Hey, {user.username}! You've currently got {user.credit} credits
              left.
            </h3>
          </Jumbotron>
          <Container fluid>
            <Row className="justify-content-center">
              {memes.map((meme) => (
                <Card key={meme._id} style={{ width: "20rem", margin: "1rem" }}>
                  <Card.Img variant="top" src={meme.image} />
                  <Card.Body>
                    <Card.Title>{meme.title}</Card.Title>
                    <Card.Text>Rarity: {meme.rarity}</Card.Text>
                    <Card.Text>Category: {meme.category}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </Row>
          </Container>
        </>
      ) : null}
    </>
  );
}

export default Profile;
