import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { QUERY_MEMES, QUERY_ME } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSprings, Spring, animated, to } from 'react-spring'
import { Form, Button, Container, Row, Jumbotron, Card } from "react-bootstrap";
import { useGesture } from 'react-use-gesture'
import './style.css'




const Opened = () => {
    let currentMemes = [];

    // These two are just helpers, they curate spring data, values that are later being interpolated into css
    const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
    const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
    // This is being used down there in the view, it interpolates rotation and scale into a css transform
    const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

    // if (gone[index]) {
    //     // calculate a position off-screen & use x direction to decide on which side of screen
    //     return (200 + window.innerWidth) * (xDir < 0 ? -1 : 1)
    // } else {
    //     // track cursor if touched
    //     return down ? xDelta : 0
    // }
    // const props = useSpring({
    //     to: { opacity: 1 },
    //     from: { opacity: 0 },
    //     delay: 200,


    // })

     // used for tracking of removed cards - not using state as we're updating during render

    // calculateX(index, down, xDir, xDelta) {
    //     if (this.gone[index]) {
    //         // calculate a position off-screen & use x direction to decide on which side of screen
    //         return (200 + window.innerWidth) * (xDir < 0 ? -1 : 1)
    //     } else {
    //         // track cursor if touched
    //         return down ? xDelta : 0
    //     }

    const { data: memeData } = useQuery(QUERY_MEMES);
    // var { memes } = memeData;
   

    const memedisplay = useSelector(state => state.memeDisplayReducer)
    console.log(memedisplay)
    
    for (let i = 0; i < memedisplay.length; i++) {

         currentMemes.push(memedisplay[i].image)
        
    }

    // const styles = useSprings({
    //         number,
    //         memedisplay.map(item => ({ opacity: item.opacity }))
    // })

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

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
                ;[array[i], array[j]] = [array[j], array[i]]
        }
        console.log(array)
        return array
    }


    
    const cards = shuffleArray(currentMemes)
    console.log()
        const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
        const [props, set] = useSprings(cards.length, i => ({ ...to(i), from: from(i) })) // Create a bunch of springs using the helpers above
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
            if (!down && gone.size === cards.length) setTimeout(() => gone.clear() || set(i => to(i)), 600)
        })
  // Now we

    if (memedisplay.length > 0) {
        
        return props.map(({ x, y, rot, scale }, i) => (
           
            <animated.div className="cardDisplay2 xtraCSS" key={i} style={{ transform: to([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
                {
                    // This is the card itself, we're binding our gesture to it (and inject its index so we know which is which)
                }
                <animated.div className="cardDisplay"  {...bind(i)} style={{ transform: to([rot, scale], trans), backgroundImage: `url(${memedisplay[i].image})` }} />
            </animated.div>
       
        ))
        
    } else {
            return (
            <div></div>
        )
    }
}

export default Opened;