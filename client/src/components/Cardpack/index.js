import React from 'react';
import { Form, Button, Container, Row, Jumbotron, Card } from "react-bootstrap";
import { useQuery } from '@apollo/react-hooks';

import { QUERY_MEMES} from "../../utils/queries"


const Cardpack = () => {

    const { data } = useQuery(QUERY_MEMES);

    

    const handleFormSubmit = async () => {
    var { memes } = data
        console.log(memes)
        for (let i = 0; i < memes.length; i++){

            console.log(memes[i].rarity)
            if (memes[i].rarity === "Legindary") {
                console.log(memes[i]) 
                console.log("Legindary")
            } else if (memes[i].rarity === "Epic") {
                console.log(memes[i])
                console.log("Epic")
            } else if (memes[i].rarity === "Worthless") {
                console.log(memes[i])
                console.log("Worthless")
            } else {
                console.log(memes[i])
                console.log("Trash")
            }
        }

        
    };

    return (
        <div>
            <Button variant="dark" type="submit" onClick={handleFormSubmit}>
                Submit
            </Button>
        </div>
    );
}

export default Cardpack