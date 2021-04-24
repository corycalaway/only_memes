import React from "react";
import { Form, Button, Container, Row, Jumbotron, Card } from "react-bootstrap";
import { useQuery } from "@apollo/react-hooks";

import { QUERY_MEMES } from "../../utils/queries";

const Cardpack = () => {
  const { data } = useQuery(QUERY_MEMES);

  const handleFormSubmit = async () => {
    var { memes } = data;
    console.log(memes);
    let highPrize = [];
    let lowPrize = [];
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

    let addOne = highPrize[highSelect];
    let addTwo = lowPrize[lowSelect];
    let addThree = lowPrize[lowSelect2];
    // add collection to user
    console.log(addOne);
    console.log(addTwo);
    console.log(addThree);
  };

  return (
    <div>
      <Button variant="dark" type="submit" onClick={handleFormSubmit}>
        Get Memes!
      </Button>
    </div>
  );
};

export default Cardpack;
