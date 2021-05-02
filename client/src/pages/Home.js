import React from "react";
import Cardpack from "../components/Cardpack";
import { Container, Jumbotron } from "react-bootstrap";
const Home = () => {
  return (
    <Container fluid>
      <Jumbotron>
        <Cardpack />
      </Jumbotron>
    </Container>
  );
};

export default Home;
