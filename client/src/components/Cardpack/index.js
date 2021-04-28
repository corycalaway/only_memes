import React, { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Form, Button, Container, Row, Jumbotron, Card } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ADD_COLLECTION } from "../../utils/mutations";
import { QUERY_MEMES, QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import cardpackImage from "../../assets/img/memepack.png";
import { useSelector, useDispatch } from "react-redux";
import { addNewMemes, cardReset } from "../../utils/actions/";
import OpenPack from "./OpenPack";

const Cardpack = () => {
  const { data } = useQuery(QUERY_MEMES);
  const dispatch = useDispatch();

  const memedisplay = useSelector((state) => state.memeDisplayReducer);

  // const { userData } = useQuery(QUERY_USER)
  // const { username: userParam } = useParams();

  const [addCollection, { error }] = useMutation(ADD_COLLECTION);
  // const user = userData?.me || userData?.user || {};

  const { loading, data: userData } = useQuery(QUERY_ME);
  const [enoughCredits, updateCredits] = useState({});

  const handleFormSubmit = async () => {
    let tempCredit;

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (Auth.loggedIn()) {
      tempCredit = userData.me.credit;
    } else {
      tempCredit = "notloggedin";
      updateCredits(tempCredit);
    }

    if (tempCredit <= 0) {
      updateCredits(tempCredit);
    } else {
      if (!token) {
      } else {
        var { memes } = data;
        let highPrize = [];
        let lowPrize = [];
        let packMemes = [];
        let fullPack = [];
        console.log(memes.length);
        for (let i = 0; i < memes.length; i++) {
          if (memes[i].rarity === "Legendary" || memes[i].rarity === "Epic") {
            highPrize.push(memes[i]);
          } else {
            lowPrize.push(memes[i]);
          }
        }

        let highSelect = Math.floor(Math.random() * highPrize.length + 1) - 1;
        let lowSelect = Math.floor(Math.random() * lowPrize.length + 1) - 1;
        let lowSelect2 = Math.floor(Math.random() * lowPrize.length + 1) - 1;

        while (lowSelect === lowSelect2) {
          lowSelect2 = Math.floor(Math.random() * lowPrize.length + 1) - 1;
        }

        let addOne = highPrize[highSelect]._id;

        packMemes.push(highPrize[highSelect]._id);
        packMemes.push(lowPrize[lowSelect]._id);
        packMemes.push(lowPrize[lowSelect2]._id);

        fullPack.push(highPrize[highSelect]);
        fullPack.push(lowPrize[lowSelect]);
        fullPack.push(lowPrize[lowSelect2]);
        console.log(fullPack);
        let result = dispatch(addNewMemes(fullPack));

        if (packMemes) {
          for (let i = 0; i < packMemes.length; i++) {
            try {
              const { data } = await addCollection({
                variables: {
                  memeId: packMemes[i],
                },
              });
              Auth.loggedIn(token);
            } catch (e) {
              console.error(e);
            }
          }
        }
        // add collection to user
      }
    }
  };

  // if (!user?.username) {
  //     return (
  //         <h4>
  //             You need to be logged in to see this page. Use the navigation links above to sign up or log in!
  //         </h4>
  //     );
  // }

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Row className="justify-content-center">
              <h3>Purchase a Pack!</h3>
            </Row>
            <Row className="justify-content-center">
              <Card style={{ width: "20rem" }}>
                <img src={cardpackImage} alt="" />
              </Card>
            </Row>

            {Auth.loggedIn() ? (
              <Row className="justify-content-center">
                {" "}
                <Button
                  style={buttonStyle}
                  variant="dark"
                  type="submit"
                  onClick={handleFormSubmit}
                >
                  Get Memes!
                </Button>
              </Row>
            ) : null}

            {enoughCredits <= 0 && (
              <Row className="justify-content-center">
                <div>
                  <h3>You do not have enough Credits!</h3>
                </div>
              </Row>
            )}

            {enoughCredits === "notloggedin" && (
              <Row className="justify-content-center">
                <div>
                  <h3>You must be logged in to purchase!</h3>
                </div>
              </Row>
            )}

            <Row className="justify-content-center"></Row>
          </Card.Body>
        </Card>
      </Row>
      <OpenPack />
    </Container>
  );
};

const buttonStyle = {
  background: "red",
};
export default Cardpack;
