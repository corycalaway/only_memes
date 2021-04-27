import React from "react";
import Cardpack from "../components/Cardpack";
import RecentOpen from "../components/RecentOpen";
import Credits from "../components/Credits";
import { Container, Row, Jumbotron, Card } from "react-bootstrap";

const Home = () => {
  return (
    <Container fluid>
      <Jumbotron>
        <Row className="justify-content-center">
          <Card style={{ width: "35rem" }}>
            <Row className="justify-content-center">
              <h3>Purchase a Pack!</h3>
            </Row>
            <Row className="justify-content-center">
              <Row className="justify-content-center">
                {" "}
                <Cardpack />
              </Row>
            </Row>
            <Row className="justify-content-center"></Row>
          </Card>
        </Row>
      </Jumbotron>
    </Container>
  );
};

export default Home;
