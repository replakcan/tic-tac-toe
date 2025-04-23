import TicTacToeBoard from './component/Gameboard.js'

const Player = function (name, marker) {
  return { name, marker }
}

const alper = Player('alper', 'X')
const mutlu = Player('mutlu', 'O')

const Gameboard = (function (player1, player2, document) {
  let firstPlayerTurn = true
  let player
  let winner

  const gameboard = TicTacToeBoard()
  document.body.appendChild(gameboard)

  const gameboardCells = [...document.querySelectorAll('.gameboard-cell')]

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  gameboardCells.map((cell) => {
    cell.addEventListener('click', (e) => {
      const { textContent } = e.target
      if (textContent != '') return

      playGame(e.target)
    })
  })

  function changePlayerTurn() {
    firstPlayerTurn = !firstPlayerTurn
  }

  function makeMove(cell) {
    firstPlayerTurn ? (player = player1) : (player = player2)

    cell.textContent = player.marker
  }

  function checkWin() {
    return winConditions.some((wincon) => {
      if (wincon.every((con) => document.getElementById(con).textContent == player1.marker)) {
        winner = player1
        return true
      }

      if (wincon.every((con) => document.getElementById(con).textContent == player2.marker)) {
        winner = player2
        return true
      }

      return false
    })
  }

  function declareWinner() {
    console.log(`${winner.name} wins!`)
  }

  function declareTie() {
    console.log('game is tie!')
  }

  function resetGameboard() {
    gameboardCells.map((cell) => (cell.textContent = ''))
  }

  function playGame(cell) {
    makeMove(cell)

    if (checkWin()) {
      declareWinner()
      resetGameboard()
    } else if (gameboardCells.every((el) => el.textContent != '')) {
      declareTie()
      resetGameboard()
    }
    changePlayerTurn()
  }

  return Object.assign({}, { gameboard, playGame })
})(alper, mutlu, document)
