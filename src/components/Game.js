import { useState } from 'react'
import GameColumn from './GameColumn'

import './Game.css'

export default function Game() {

  const ROWS = 6
  const COLS = 7

  let grid = Array.from(Array(COLS), () => new Array(ROWS))

  return (
    <div className='game'>
      {grid.map((el, i) => {
        return <GameColumn num={i} height={ROWS} />
      })}
    </div>
  )
}