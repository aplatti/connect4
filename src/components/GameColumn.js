
export default function GameColumn({colNum, numRows, height, chips, addChip}) {
  const P1_COLOR = 'red'
  const P2_COLOR = 'yellow'

  let cells = []
  for (let i=(numRows - 1); i >= 0; i--) {
    let cellState = chips[i]
    let cellColor = (cellState === '1') ? P1_COLOR : (cellState === '2') ? P2_COLOR : ''
    cells.push((
      <div className={`game-cell ${cellColor}`} key={i}></div>
    ));
  }

  const handleClick = () => {
    addChip(colNum)
  }

  return (
    <div className="game-column" onClick={handleClick}>
      {cells}
    </div>
  )
}