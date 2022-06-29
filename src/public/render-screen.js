export default function renderScreen(screen, game, requestAnimationFrame, currentPlayerId) {
    const context = screen.getContext('2d')
    context.fillStyle = '#444444'
    context.clearRect(0, 0, 50, 50)

    //player
    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = '#CCCCCC'
        context.fillRect(player.x, player.y, 1, 1)
    }

    //fruit
    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = '#d01050'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    const currentPlayer = game.state.players[currentPlayerId]

    //currentPlayer
    if(currentPlayer) {
        context.fillStyle = '#80e040'
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
    }

    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame, currentPlayerId)
    })
}