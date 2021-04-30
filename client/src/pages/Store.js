import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import {
  Container,
  Row,
  Jumbotron,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import { QUERY_STRIPE_SESS, SUBSCRIPTION, QUERY_ME } from "../utils/queries";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/react-hooks";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_CREDITS } from "../utils/mutations";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import StripeCheckout from "react-stripe-checkout";

require("dotenv").config();

// might have to change later
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
// const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const Store = (props) => {
  const [getStripeSess, { data }] = useLazyQuery(QUERY_STRIPE_SESS);
  const [addCredits, { error }] = useMutation(ADD_CREDITS);
  const [subscription] = useLazyQuery(SUBSCRIPTION);
  const [clientSecret, setClientSecret] = useState("");
  const { loading, data: userData } = useQuery(QUERY_ME);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // let stripeHandler = StripeCheckout.configure({
  //   key: stripePromise,
  //   locale: 'en',
  //   token: function(token){

  //   }
  // })

  // const CheckoutForm = () => {
  //   const stripe = useStripe();
  //   const elements = useElements();

  //   const handleSubmit = async event => {
  //     event.preventDefault();
  //     const { error, paymentMethod } = await stripe.createPaymentMethod({
  //       type: "card",
  //       card: elements.getElement(CardElement)
  //     });

  //     if(!error) {
  //       const { id } = paymentMethod;

  //       try {
  //     getStripeSess();

  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //   }
  //   return (

  //   <form onSubmit={handleSubmit}>

  //     <CardElement />
  //     <button type="submit">Pay</button>
  //    I'm a form
  //    </form>
  //    )
  // }

  // useEffect(() => {
  //   console.log(data);
  //   if (data) {
  //     stripePromise.then((res) => {
  //       res.redirectToCheckout({ sessionId: data.getStripeSess.session });
  //     });
  //   }
  //   console.log(data)
  // }, [data]);

  // async function submitCheckout() {

  //   // let price = 1200
  //   // stripeHandler.open({
  //   //   amount: price
  //   // })
  //   // await confirmPayment();
  // }

  // async function confirmPayment() {
  //   console.log("confirmPayment working");
  //   var response = await fetch("/secret").then(function (response) {
  //     console.log("first response");
  //     return response.json();
  //   });
  // .then(function (responseJson) {
  //   console.log("second promise response");
  //   var clientSecret = responseJson.client_secret;
  //   // Call stripe.confirmCardPayment() with the client secret.
  //   stripe.retrievePaymentIntent(clientSecret).then(function (response) {
  //     if (
  //       response.paymentIntent &&
  //       response.paymentIntent.status === "succeeded"
  //     ) {
  //       // Handle successful payment here
  //       addCredits();
  //       console.log("payment successful");
  //     } else {
  //       // Handle unsuccessful, processing, or canceled payments and API errors here
  //     }
  //   });
  // });
  // console.log("the response is", response);
  // return response;
  // }

  // function Modal() {
  //   console.log("modal function firing");
  //   return (

  //   );
  // }
  let stripeRan = false;
  // useEffect(() => {
  //   console.log("useEffect triggered");

  //   if (stripeRan) {
  //     handleShow();
  //   }
  //   // return (

  //   // );
  // }, [stripeRan]);
  return (
    <Container fluid>
      <Row className="justify-content-left">
        <Card style={{ width: "20rem", margin: "1rem" }}>
          <Card.Body>
            <Card.Title>10 Credits</Card.Title>
            <Card.Text>$9.99</Card.Text>
            {Auth.loggedIn() ? (
              <>
                <StripeCheckout
                  amount={999}
                  token={async (token) => {
                    console.log(token);
                    const response = await subscription({
                      variables: { source: token.id },
                    });
                    console.log("end stripe checkout");
                    console.log(response);

                    const creditsGalore = await addCredits({
                      refetchQueries: [{ query: QUERY_ME }],
                    });
                    handleShow();
                    console.log("logging CreditsGalore");
                    console.log(creditsGalore);
                  }}
                  stripeKey="pk_test_51IlTtaBUkwJkuKUZFnJfhMskFb19fE0lGkZBKaxBsY44lxavB6DMfg88D31jw8tdcFGSQcjt8cbHIQVNmtJCkIGA00TSTd0gD9"
                />
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Thanks for your purchase!</Modal.Body>
                </Modal>
              </>
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
