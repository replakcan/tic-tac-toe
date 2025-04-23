function GameboardCell() {
  const cell = document.createElement('div')

  cell.textContent = ''
  cell.classList.add('gameboard-cell')

  return cell
}

export default GameboardCell
