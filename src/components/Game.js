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

    function encodeWin (player, row1, col1, row2, col2) {
      return {
        player: player,
        from: {
          row: row1,
          col: col1
        },
        to : {
          row: row2,
          col: col2
        }
      }
    }

    const hasDescendingDiagonalWin = (grid) => {
      let clone = JSON.parse(JSON.stringify(grid))
      for (let colNum = 0; colNum < clone.length; colNum++) {
        let col = clone[colNum]
        let unshifts = 0;
        for (; unshifts < colNum; unshifts++) {
          col.unshift(null)
        }
      }
      // printGrid(clone)
      return hasRowWin(clone)
    }

    const hasAscendingDiagonalWin = (grid) => {
      let clone = JSON.parse(JSON.stringify(grid))

      for (let colNum = 0; colNum < clone.length; colNum++) {
        let col = clone[colNum]
        let unshifts = clone.length - (colNum + 1);
        for (; unshifts > 0; unshifts--) {
          col.unshift(null)
        }
      }
      // printGrid(clone)
      return hasRowWin(clone)
    }

    const hasRowWin = (grid) => {
      let player, streak, cellVal
      let maxLength = getMaxColumnLength(grid)
      for (let row = 0; row < maxLength; row++) {
        player = null
        streak = 0
        for(let col = 0; col < grid.length; col++) {
          cellVal = grid[col][row]

          if (player && player === cellVal) {
            streak++
          } else {
            player = cellVal
            streak = 1
          }

          if (streak === 4) {
            return encodeWin(player, row, col - 3, row, col)
          }
        }  // col loop
      } // row loop
    }


    const hasColWin = (grid) => {
      let player, streak, cellVal
      let maxLength = getMaxColumnLength(grid)
      for(let col = 0; col < grid.length; col++) {
        player = null
        streak = 0

        for (let row = 0; row < maxLength; row++) {
          cellVal = grid[col][row]

          if (player && player === cellVal) {
            streak++
          } else {
            player = cellVal
            streak = 1
          }

          if (streak === 4) {
            return encodeWin(player, row - 3, col, row, col) 
          }
        }  // col loop
      } // row loop
    }

    const printGrid = (grid) => {
      let cellVal
      let maxLength = getMaxColumnLength(grid)
      let pic = ''
      for (let row = maxLength -1;  row >= 0; row--) {
        for(let col = 0; col < grid.length; col++) {
          cellVal = grid[col][row]
          pic += cellVal || '_'
        }  // col loop
        pic += '\n'
      } // row loop
      console.log(pic)
    }

    const getMaxColumnLength = (grid) => {
      let maxLength = 0;
      for (let i=0; i < grid.length; i++) {
        maxLength = Math.max(maxLength, grid[i].length) 
      }
      return maxLength;
    }

    console.log('useEffect for Grid called')
    let win = hasRowWin(grid) || hasColWin(grid) || hasDescendingDiagonalWin(grid) || hasAscendingDiagonalWin(grid) 
    if (win){
      console.log(win)
      setHasWinner(true)
    }
  }, [grid])



  return (
    <>
      <div className='game-status'>
        {hasWinner && <p>We have a WINNER!!!</p>}
        {!hasWinner && 
          <p>{isPlayerOneTurn ? <span className="red">Red</span> : <span className="yellow">Yellow</span>}'s Turn!</p>
        }
      </div>
      <div className='game'>
        {grid && grid.map((colArr, i) => {
          return <GameColumn key={i} colNum={i} numRows={ROWS} chips={colArr} height={ROWS} addChip={addChip}/>
        })}
      </div>
    </>
  )
}