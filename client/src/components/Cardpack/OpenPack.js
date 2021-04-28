import { useSelector, useDispatch } from 'react-redux';
import { QUERY_MEMES, QUERY_ME } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";

import './style.css'
import { Form, Button, Container, Row, Jumbotron, Card } from "react-bootstrap";


import { render } from 'react-dom'
import React, { useState } from 'react'
import { useSprings, animated, to, useSpring } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import { valueFromAST } from 'graphql';

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const start = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
const end = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

const Opened = () => {



    // const props = useSpring({
    //     to: { opacity: 1 },
    //     from: { opacity: 0 },
    //     delay: 200,


    // })

    // const styles = useSpring({
    //     loop: true,
    //     from: { rotateZ: 180 },
    //     to: { rotateZ: 0 },
    //     delay: 10000
        
    // })

    const { data: memeData } = useQuery(QUERY_MEMES);
    // var { memes } = memeData;
    console.log(memeData)
    const memedisplay = useSelector(state => state.memeDisplayReducer)
    console.log(memedisplay)

    let memearray = [];
    memedisplay.forEach(function(meme) {
        console.log(meme.image)
        return memearray.push(meme.image)
        
      
    })
    console.log(memearray)
    // const cards = [
    //     'https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg',
    //     'https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg',
    //     'https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg',
    //     'https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg',
    //     'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
    //     'https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg'
    // ]

console.log('pass')
    const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out

    const styles = useSpring({
        loop: true,
        from: { rotateZ: 0 },
        to: { rotateZ: 180 },
    })

    const [props, set] = useSprings(memearray.length, i => ({ ...start(i), from: end(i) }))
    console.log(set)
    console.log(props)
    console.log(gone)
    // Create a bunch of springs using the helpers above
    // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
    const bind = useGesture(({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
        const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
        const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
        if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
        set(i => {
            if (index !== i) return // We're only interested in changing spring-data for the current spring
            const isGone = gone.has(index)
            const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
            const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
            const scale = down ? 1.1 : 1 // Active cards lift up a bit
            return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
        })
        if (!down && gone.size === memearray.length) setTimeout(() => gone.clear() || set(i => start(i)), 600)
    })
    console.log('here')
    // for (let i = 0; i < memedisplay.length; i++) {
    //     console.log(memedisplay[0].image)
    //     return (
    //         <img src={memedisplay[0].image} alt="" />
    //     )
    // }
    // memedisplay.forEach(function(meme) {
    //     console.log(meme.image)
    //     return(<img src={meme.image} />)ca
    // })
    if (memedisplay.length > 0) {
       
        console.log(props)
        console.log(trans)
       
        return props.map(({ x, y, rot, scale }, i) => (
           
            <>
            <div><h1>here</h1></div>
        
                <animated.div key={i} style={{ styles }} src={memearray[i]}>
                    <img  />
              
            </animated.div>
            </>
        ))
    } else {
        return (
            <div></div>
        )
    }
}

export default Opened;



// import './styles.css'


{/* <animated.div key={i} style={{ transform = to([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
    {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
//     <animated.div {...bind(i)} style={{ transform = to([rot, scale], trans), backgroundImage: `url(${cards[i]})` }} />
// </animated.div> */}
{/* <animated.div key={i} style={{ x, y }}>
    <img src={memearray[i]} />
    {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
//     <animated.div {...bind(i)} style={{ rot, scale, trans, backgroundimage: `url(${memearray[i]})` }}><img src={memearray[i]} /></animated.div>
// </animated.div> */}