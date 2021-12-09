
export default function GameColumn({num, height}) {

  let cells = []
  for (let i=0; i < 7; i++) {
    cells.push((
      <div className='game-cell'>{i}, {height}</div>
    ));
  }

  return (
    <div className="game-column">
      {cells}
    </div>


  )
}