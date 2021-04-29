import React from "react";

import { Container, Row, Jumbotron, Card, Button } from "react-bootstrap";
import { QUERY_STRIPE_SESS } from "../utils/queries";
import { loadStripe } from "@stripe/stripe-js";

// might have to change later
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Store = () => {
  return (
    <Container fluid>
      <Row className="justify-content-left">
        <Card style={{ width: "20rem", margin: "1rem" }}>
          <Card.Body>
            <Card.Title>10 Credits</Card.Title>
            <Card.Text>$9.99</Card.Text>
            <Button>
              Buy Bundle <i class="fas fa-money-bill"></i>
            </Button>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default Store;
