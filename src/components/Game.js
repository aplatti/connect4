import { useState } from 'react'
import GameColumn from './GameColumn'

import './Game.css'

export default function Game() {
  const ROWS = 6
  const COLS = 7

  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true)
  const [grid, setGrid] = useState(Array.from(Array(COLS), () => []))

  const addChip = (column) => {

    if (grid[column].length < ROWS) {
      grid[column].push(isPlayerOneTurn ? '1' : '2')
      setIsPlayerOneTurn((state) => !state)
      console.log('added chip to column ' + column)
      console.log(grid)
    } else {
      console.log('Already filled this column')
    }
  }

  return (
    <div className='game'>
      {grid && grid.map((colArr, i) => {
        return <GameColumn key={i} colNum={i} numRows={ROWS} chips={colArr} height={ROWS} addChip={addChip}/>
      })}

      <div className='game-turn'>
        It's {isPlayerOneTurn ? <span className="red">Red</span> : <span className="yellow">Yellow</span>}'s Turn!
      </div>
    </div>
  )
}