import React, { useEffect } from "react";
import Auth from "../utils/auth";
import { Container, Row, Jumbotron, Card, Button } from "react-bootstrap";
import { QUERY_STRIPE_SESS } from "../utils/queries";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/react-hooks";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_CREDITS } from "../utils/mutations";
// might have to change later
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

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

  async function submitCheckout() {
    await getStripeSess();
    await confirmPayment();
  }

  async function confirmPayment() {
    console.log("confirmPayment working");
    var response = await fetch("/secret")
      .then(function (response) {
        console.log("first response");
        return response.json();
      })
      .then(function (responseJson) {
        console.log("second promise response");
        var clientSecret = responseJson.client_secret;
        // Call stripe.confirmCardPayment() with the client secret.
        stripe.retrievePaymentIntent(clientSecret).then(function (response) {
          if (
            response.paymentIntent &&
            response.paymentIntent.status === "succeeded"
          ) {
            // Handle successful payment here
            addCredits();
            console.log("payment successful");
          } else {
            // Handle unsuccessful, processing, or canceled payments and API errors here
          }
        });
      });
    console.log("the response is", response);
    // return response;
  }

  return (
    <Container fluid>
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
    </Container>
  );
};

export default Store;
