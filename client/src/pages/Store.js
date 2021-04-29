import React from "react";

import { Container, Row, Jumbotron, Card, Button } from "react-bootstrap";
import { QUERY_STRIPE_SESS } from "../utils/queries";
import { loadStripe } from "@stripe/stripe-js";

// might have to change later
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Store = () => {
  return (
    <Container fluid>
      <Jumbotron>
        <Row className="justify-content-center">
          <h3>10 Credits</h3>{" "}
        </Row>
        <Row className="justify-content-center">
          {" "}
          <h3>$9.99</h3>
        </Row>
        <Row className="justify-content-center">
          {" "}
          <Button>
            Buy Bundle <i className="fas fa-money-bill"></i>
          </Button>
        </Row>
      </Jumbotron>
    </Container>
  );
};

export default Store;
