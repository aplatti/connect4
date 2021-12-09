import GameColumn from './GameColumn'

export default function Game() {

  const ROWS = 6
  const COLS = 7

  let grid = Array.from(Array(COLS), () => new Array(ROWS))

  return (
    <div className='Game'>
      {grid.map((el, i) => {
        return <GameColumn num={i} height={ROWS} />
      })}
    </div>
  )
}