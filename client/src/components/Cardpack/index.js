import React, { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Form, Button, Container, Row, Jumbotron, Card } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ADD_COLLECTION } from "../../utils/mutations";
import { QUERY_MEMES, QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import cardpackImage from "../../assets/img/memepack.png";

const Cardpack = () => {
    const { data } = useQuery(QUERY_MEMES);
    // const { userData } = useQuery(QUERY_USER)
    // const { username: userParam } = useParams();

    const [addCollection, { error }] = useMutation(ADD_COLLECTION);
    // const user = userData?.me || userData?.user || {};

    const { loading, data: userData } = useQuery(QUERY_ME)
    const [ enoughCredits, updateCredits] = useState({})


    const handleFormSubmit = async () => {
        console.log(userData.me.credit)
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        let tempCredit = userData.me.credit


        if (userData.me.credit <= 0) {
               console.log(tempCredit)
          
            updateCredits(tempCredit)

              
           
           console.log(enoughCredits)
        } else {
            
           
            if (!token) {
                console.log("no token");
            } else {
                var { memes } = data;
                console.log(memes);
                let highPrize = [];
                let lowPrize = [];
                let packMemes = [];

                for (let i = 0; i < memes.length; i++) {
                    if (memes[i].rarity === "Legendary" || memes[i].rarity === "Epic") {
                        highPrize.push(memes[i]);
                    } else {
                        lowPrize.push(memes[i]);
                    }
                }
                console.log(highPrize);
                console.log(lowPrize);

                let highSelect = Math.floor(Math.random() * highPrize.length + 1) - 1;
                let lowSelect = Math.floor(Math.random() * highPrize.length + 1) - 1;
                let lowSelect2 = Math.floor(Math.random() * highPrize.length + 1) - 1;

                while (lowSelect === lowSelect2) {
                    lowSelect2 = Math.floor(Math.random() * highPrize.length + 1) - 1;
                }

                let addOne = highPrize[highSelect]._id;
                // let addTwo = lowPrize[lowSelect];
                // let addThree = lowPrize[lowSelect2];
                packMemes.push(highPrize[highSelect]._id);
                packMemes.push(lowPrize[lowSelect]._id);
                packMemes.push(lowPrize[lowSelect2]._id);

                console.log(packMemes);
                for (let i = 0; i < packMemes.length; i++) {
                    try {
                        console.log(addOne);

                        const { data } = await addCollection({
                            variables: {
                                memeId: packMemes[i],
                            },
                        });
                        console.log(data);
                        Auth.loggedIn(token);
                    } catch (e) {
                        console.error(e);
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
                    <Row className="justify-content-center">
                        <h3>Purchase a Pack!</h3>
                    </Row>
                    <Row className="justify-content-center">
                        <Card style={{ width: "20rem" }}>
                            <img
                                src={cardpackImage}
                                alt=""
                            />
                        </Card>
                    </Row>
                    <Row className="justify-content-center">

                        <Row className="justify-content-center">
                            {" "}

                            <div>
                                <Button variant="dark" type="submit" onClick={handleFormSubmit}>
                                    Get Memes!
                                    </Button>
                            </div>
                        </Row>
                    </Row>

                    {enoughCredits <= 0 && 
                        <Row className="justify-content-center">
                            <div>
                                <h3>You do not have enough Credits!</h3>

                            </div>
                        </Row> 
                    }


                    <Row className="justify-content-center"></Row>
                </Card>
            </Row>


        </Container>
    );
};

export default Cardpack;
