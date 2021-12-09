
export default function GameColumn({colNum, height, addChip}) {

  let cells = []
  for (let i=0; i < 7; i++) {
    cells.push((
      <div className='game-cell' key={i}>{i}, {height}</div>
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