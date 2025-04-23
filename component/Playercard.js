function PlayerCard(player) {
  const playerCard = document.createElement('div')
  const playerName = document.createElement('h1')
  const playerMarker = document.createElement('h1')

  playerCard.classList.add('player-card')

  playerName.textContent = player.name
  playerMarker.textContent = `marker: ${player.marker}`

  playerCard.appendChild(playerName)
  playerCard.appendChild(playerMarker)

  return playerCard
}

export default PlayerCard
