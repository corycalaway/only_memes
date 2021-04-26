import React from "react";
import { Redirect, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Jumbotron, Card } from "react-bootstrap";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ADD_COLLECTION } from "../../utils/mutations";
import { QUERY_MEMES, QUERY_USER } from "../../utils/queries";
import Auth from "../../utils/auth";

const Cardpack = () => {
    const { data } = useQuery(QUERY_MEMES);
    // const { data: userData } = useQuery(QUERY_USER);
    // const { userData } = useQuery(QUERY_USER)
    // const { username: userParam } = useParams();

    const [addCollection, { error }] = useMutation(ADD_COLLECTION);
    // const user = userData?.me || userData?.user || {};

    const handleFormSubmit = async () => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        // console.log(userData)
        if (!token) {
            console.log("no token")
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
            packMemes.push(highPrize[highSelect]._id)
            packMemes.push(lowPrize[lowSelect]._id)
            packMemes.push(lowPrize[lowSelect2]._id)
            
            console.log(packMemes)
            for (let i = 0; i < packMemes.length; i++) {
            try {
                console.log(addOne)

                
                const { data } = await addCollection({
                    
                    variables: {
                        memeId: packMemes[i]}
                });
                console.log(data)
                Auth.loggedIn(token);
            } catch (e) {
                console.error(e);
            }
        }
            // add collection to user
            
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
        <div>
            <Button variant="dark" type="submit" onClick={handleFormSubmit}>
                Get Memes!
      </Button>
        </div>
    );
};

export default Cardpack;
