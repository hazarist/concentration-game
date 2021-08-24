import React from 'react'
import { useSpring, a } from '@react-spring/web'
import useIsMatch from '../../hooks/useIsMatched';
import logo from '../../assets/card-back.svg';
import useFlipped from '../../hooks/useFlip';

import './styles.css'

function FlipCard({ matchList, order, size, closeList, setFlippedId, id, img }) {
  const [isMatched] = useIsMatch(matchList, id);
  const [flipped, setFlipped] = useFlipped(closeList, order)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(1000px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 150, friction: 20 },
  })

  return (
    isMatched ?
      <div className="container">
        <div
          className={`c-${size} front`}
          style={{
            opacity: "0.4",
            transform: "rotateY(180deg)",
            backgroundImage: `url(${img})`
          }}
        />
      </div>
      :
      <div className="container" onClick={() => {
        !flipped && setFlippedId(order, id)
        setFlipped(true)
      }}>
        <a.div
          className={`c-${size} back`}
          style={{
            opacity: opacity.to(o => 1 - o),
            transform,
            backgroundImage: `url(${logo})`,
            backgroundColor: "blueviolet"
          }}
        />
        <a.div
          className={`c-${size} front`}
          style={{
            opacity,
            transform,
            backgroundImage: `url(${img})`,
          }}
        />
      </div>
  )
}

export default FlipCard;