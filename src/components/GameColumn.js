
export default function GameColumn({num, height, addChip}) {

  let cells = []
  for (let i=0; i < 7; i++) {
    cells.push((
      <div className='game-cell'>{i}, {height}</div>
    ));
  }

  const handleClick = () => {
    addChip(num)
  }

  return (
    <div className="game-column" onClick={handleClick}>
      {cells}
    </div>


  )
}