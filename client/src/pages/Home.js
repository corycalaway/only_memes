import React from "react";
import Cardpack from "../components/Cardpack";
import RecentOpen from "../components/RecentOpen";
import Credits from "../components/Credits";
import { Container, Row, Jumbotron, Card } from "react-bootstrap";
import Store from "./Store";
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
