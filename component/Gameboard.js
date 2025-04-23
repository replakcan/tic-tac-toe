import GameboardCell from './GameboardCell.js'

function TicTacToeBoard() {
  const gameboard = document.createElement('div')

  gameboard.classList.add('gameboard')

  for (let i = 0; i < 9; i++) {
    const cell = GameboardCell()
    cell.id = i

    gameboard.appendChild(cell)
  }

  return gameboard
}

export default TicTacToeBoard
