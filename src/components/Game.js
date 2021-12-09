import { useState, useEffect } from 'react'
import GameColumn from './GameColumn'

import './Game.css'

export default function Game() {
  const ROWS = 6
  const COLS = 7

  const [hasWinner, setHasWinner] = useState(false)
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true)
  const [grid, setGrid] = useState(Array.from(Array(COLS), () => []))

  const addChip = (column) => {
    if (hasWinner) return

    if (grid[column].length < ROWS) {
      grid[column].push(isPlayerOneTurn ? '1' : '2')
      setGrid([...grid])
      setIsPlayerOneTurn((state) => !state)
    } else {
      console.log('Already filled this column')
    }
  }

  
  useEffect(() => {
    const hasRowWin = () => {
      let player, streak, cellVal
      for (let row = 0; row < ROWS; row++) {
        player = null
        streak = 0
        for(let col = 0; col < COLS; col++) {
          cellVal = grid[col][row]

          if (player && player === cellVal) {
            streak++
          } else {
            player = cellVal
            streak = 1
          }

          if (streak === 4) {
            return true
          }
        }  // col loop
      } // row loop
    }

    const hasColWin = () => {
      let player, streak, cellVal
      for(let col = 0; col < COLS; col++) {
        player = null
        streak = 0
        for (let row = 0; row < ROWS; row++) {
          cellVal = grid[col][row]

          if (player && player === cellVal) {
            streak++
          } else {
            player = cellVal
            streak = 1
          }

          if (streak === 4) {
            return true
          }
        }  // col loop
      } // row loop
    }

    console.log('useEffect for Grid called')
    if (hasRowWin() || hasColWin()) {
      setHasWinner(true)
    }
  }, [grid])



  return (
    <div className='game'>
      {grid && grid.map((colArr, i) => {
        return <GameColumn key={i} colNum={i} numRows={ROWS} chips={colArr} height={ROWS} addChip={addChip}/>
      })}

      <div className='game-turn'>
        {hasWinner && <p>We have a WINNER!!!</p>}
        {!hasWinner && 
          <p>It's {isPlayerOneTurn ? <span className="red">Red</span> : <span className="yellow">Yellow</span>}'s Turn!</p>
        }

      </div>
    </div>
  )
}