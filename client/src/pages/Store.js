import React, { useEffect } from "react";
import Auth from "../utils/auth";
import { Container, Row, Jumbotron, Card, Button } from "react-bootstrap";
import { QUERY_STRIPE_SESS } from "../utils/queries";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/react-hooks";
import { ADD_CREDITS } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";

// might have to change later
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Store = () => {
  const [getStripeSess, { data }] = useLazyQuery(QUERY_STRIPE_SESS);
  const [addCredits, { error }] = useMutation(ADD_CREDITS);

  useEffect(() => {
    console.log(data);
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.getStripeSess.session });
      });
    }
  }, [data]);

  function submitCheckout() {
    getStripeSess();
    console.log("cooooooooooooooooooooool");
    addCredits();
  }

  return (
    <Container fluid>
<<<<<<< HEAD
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
=======
      <Row className="justify-content-left">
        <Card style={{ width: "20rem", margin: "1rem" }}>
          <Card.Body>
            <Card.Title>10 Credits</Card.Title>
            <Card.Text>$9.99</Card.Text>
            {Auth.loggedIn() ? (
              <Button onClick={submitCheckout}>
                Buy Bundle <i class="fas fa-money-bill"></i>
              </Button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </Card.Body>
        </Card>
      </Row>
>>>>>>> feature/bret
    </Container>
  );
};

export default Store;
