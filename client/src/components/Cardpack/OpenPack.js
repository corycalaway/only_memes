import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { QUERY_MEMES, QUERY_ME } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSpring, animated } from 'react-spring'
import { Form, Button, Container, Row, Jumbotron, Card } from "react-bootstrap";

const Opened = () => {



    const props = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0 },
        delay: 200,


    })

    const styles = useSpring({
        loop: true,
        from: { rotateZ: 180 },
        to: { rotateZ: 0 },
        delay: 10000
    })

    const { data: memeData } = useQuery(QUERY_MEMES);
    // var { memes } = memeData;
    console.log(memeData)
    const memedisplay = useSelector(state => state.memeDisplayReducer)
    console.log(memedisplay)


    // for (let i = 0; i < memedisplay.length; i++) {
    //     console.log(memedisplay[0].image)
    //     return (
    //         <img src={memedisplay[0].image} alt="" />
    //     )
    // }
    // memedisplay.forEach(function(meme) {
    //     console.log(meme.image)
    //     return(<img src={meme.image} />)
    // })
    if (memedisplay.length > 0) {
        return (
            <>      
            <Row>
                <Card style={{ width: "20rem" }}>
             
                        <animated.img src={memedisplay[0].image} style={props, styles} alt="" />
               
                </Card>
                <Card style={{ width: "20rem" }}>
                    <animated.img src={memedisplay[1].image} style={props, styles} alt="" />

                </Card>
                <Card style={{ width: "20rem" }}>
                        <animated.img src={memedisplay[2].image} style={props, styles} alt="" />
                </Card>
            </Row>
                {/* <animated.div style={props}>I will fade in</animated.div> */}
            </>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default Opened;