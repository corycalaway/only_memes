import React from "react";
import { Link } from "react-router-dom";
import { QUERY_USER } from "../utils/queries";
import { Container, Row, Col, Jumbotron, Card } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth"
function Profile() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.users[0];
    console.log(Auth.getProfile())
    console.log(user);
  }

  return (
    <>
      {user ? (
        <>
          {user.memes.map((meme) => (
            <Card>
              <Card.Img variant="top" src={meme.image} />
              <Card.Body>
                <Card.Title>{meme.title}</Card.Title>
                <Card.Text>Rarity: {meme.rarity}</Card.Text>
                <Card.Text>Category: {meme.category}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </>
      ) : null}
    </>
  );
}

export default Profile;
