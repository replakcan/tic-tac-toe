import TicTacToeBoard from './component/Gameboard.js'
import PlayerCard from './component/Playercard.js'

const Player = function (name, marker) {
  return { name, marker }
}

const player1 = Player('player1', 'X')
const player2 = Player('player2', 'O')

document.body.appendChild(PlayerCard(player1))

const resultDialog = document.createElement('dialog')
document.body.appendChild(resultDialog)

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
    resultDialog.textContent = `${winner.name} wins!`
    resultDialog.showModal()

    setTimeout(() => resultDialog.close(), 2000)
  }

  function declareTie() {
    resultDialog.textContent = `it\s a tie!`
    resultDialog.showModal()

    setTimeout(() => resultDialog.close(), 2000)
  }

  function resetGame() {
    gameboardCells.map((cell) => (cell.textContent = ''))
    winner = ''
    resultDialog.textContent = ''
  }

  function playGame(cell) {
    makeMove(cell)

    if (checkWin()) {
      declareWinner()
      setTimeout(() => resetGame(), 2000)
    } else if (gameboardCells.every((el) => el.textContent != '')) {
      declareTie()
      setTimeout(() => resetGame(), 2000)
    } else {
      changePlayerTurn()
    }
  }
})(player1, player2, document)

document.body.appendChild(PlayerCard(player2))
