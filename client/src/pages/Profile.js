import React from "react";
import { Link } from "react-router-dom";
import { QUERY_USER } from "../utils/queries";
import { Container, Row, Col, Jumbotron, Card } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";

function Profile() {
  const { data: userData } = useQuery(QUERY_USER);

  let users;
  let loggedIn;
  let usersId;
  let currentlyLoggedIn;

  if (!Auth.loggedIn()) {
    console.log(userData)
    users = userData.users;
    loggedIn = Auth.getProfile().data._id;
    usersId = users.map((user) => {
      return user._id;
    });

    currentlyLoggedIn = usersId.indexOf(loggedIn);

    currentlyLoggedIn = users[currentlyLoggedIn];
    console.log(currentlyLoggedIn);
  } else {
    return (
      <>
        <Jumbotron>did it work?</Jumbotron>
      </>
    );
  }

  return (
    <>
      {userData ? (
        <>
          {currentlyLoggedIn.memes.map((meme) => (
            <Card style={{ width: "20rem" }}>
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
