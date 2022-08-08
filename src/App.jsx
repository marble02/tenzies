import { useState, useEffect } from "react"
import Die from "./components/Die.jsx"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = useState(allRandomNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const firstVal = dice[0].value
    const allSameValue = dice.every(d => d.value == firstVal)
    const allHeld = dice.every(d => d.isHeld ) 
    if (allHeld && allSameValue) {
      setTenzies(true)
    } 
    // (allSameValue && allHeld) ? console.log("every") : console.log("not yet")
  }, [dice])
  
  function resetGame() {
    setTenzies(false)
    setDice(allRandomNewDice())
  }
  
  function getNewDie() {
    return ({
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
    )
  }
  
  function allRandomNewDice() {
    let arr = []
    for(let i = 0; i < 10; i++) {
      arr.push(getNewDie())
    }
    return arr
  }
  
  function handleFreeze(id) {
    setDice(prevDice => prevDice.map(d => {
      return d.id == id ? {...d, isHeld: !d.isHeld} : d
    }))
  }
  
  function rollDice() {
    setDice(prevDice => prevDice.map(d => {
      return !d.isHeld ? getNewDie() : d
    }))
  }
  
  
  const diceSet = dice.map(d => 
    <Die 
    key={d.id}
    num={d.value} 
    isHeld={d.isHeld}
    handleFreeze={() => handleFreeze(d.id)}
  />)

  return (
    <div className="App">
      <main>
      {tenzies && <Confetti />}
        <header>
          <h1 className="title">Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls. Freeze all dice to the same value to win.</p>
        </header>
        <div className="dice-container">
          {diceSet}
        </div>
        {tenzies ? <button onClick={resetGame}>Reset Game</button> : <button onClick={rollDice}>Roll</button>}
      </main>
    </div>
  )
}

export default App
