import React from 'react'

function Die(props) {
  return (
    <div className={props.isHeld ? "die held" : "die"} onClick={props.handleFreeze}>
        <h1>{props.num}</h1>
    </div>
  )
}

export default Die