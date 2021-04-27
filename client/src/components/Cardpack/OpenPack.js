import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { QUERY_MEMES, QUERY_ME } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";


const Opened = () => {

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
           <div>
            <img src={memedisplay[0].image} alt="" />
            </div>
            <div>
            <img src={memedisplay[1].image} alt="" />
            </div>
            <img src={memedisplay[2].image} alt="" />
            </>
        )
    } else {
    return (
        <div></div>
    )
    }
}

export default Opened;