import { useState } from 'react'
import GameColumn from './GameColumn'

import './Game.css'

export default function Game() {

  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true)

  const ROWS = 6
  const COLS = 7

  let grid = Array.from(Array(COLS), () => new Array(ROWS))

  const addChip = (column) => {
    console.log('add chip to column ' + column)
  }

  return (
    <div className='game'>
      {grid.map((el, i) => {
        return <GameColumn num={i} height={ROWS} addChip={addChip}/>
      })}

      <div className='game-turn'>
        It's {isPlayerOneTurn ? <span className="red">Red</span> : <span className="yellow">Yellow</span>}'s Turn!
      </div>
    </div>
  )
}