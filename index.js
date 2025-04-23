const Player = function (name, marker) {
  return { name, marker }
}

const alper = Player('alper', 'X')
const mutlu = Player('mutlu', 'O')

const Gameboard = (function (player1, player2) {
  const gameboard = new Array(9).fill(null)

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

  let firstPlayerTurn = true
  let player
  let winner

  function changePlayerTurn() {
    firstPlayerTurn = !firstPlayerTurn
  }

  function makeMove(index) {
    if (gameboard[index] != null) return

    firstPlayerTurn ? (player = player1) : (player = player2)

    gameboard.splice(index, 1, player.marker)
    changePlayerTurn()
  }

  function checkWin() {
    return winConditions.some((wc) => {
      if (wc.every((el) => gameboard[el] == player1.marker)) {
        winner = player1
        return true
      }

      if (wc.every((el) => gameboard[el] == player2.marker)) {
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
    gameboard.fill(null)
  }

  function playGame(index) {
    makeMove(index)

    if (checkWin()) {
      declareWinner()
      resetGameboard()
    } else if (gameboard.every((el) => el != null)) {
      declareTie()
      resetGameboard()
    }
  }

  return Object.assign({}, { gameboard, playGame })
})(alper, mutlu)

Gameboard.playGame(0)
Gameboard.playGame(7)
Gameboard.playGame(1)
Gameboard.playGame(4)
Gameboard.playGame(2)

console.log(Gameboard.gameboard)
