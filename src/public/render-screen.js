export function setupScreen(canvas, game) {
    canvas.width = game.state.screen.width
    canvas.height = game.state.screen.height
}

export default function renderScreen(screen, scoreTable, game, requestAnimationFrame, currentPlayerId) {
    const context = screen.getContext('2d')
    context.fillStyle = 'white'
    const { screen: {width, height} } = game.state
    context.clearRect(0, 0, width, height)

    for (const player of Object.values(game.state.players)) {
        context.fillStyle = '#b3b3b3'
        context.fillRect(player.x, player.y, 1, 1)
    }
    
    for (const fruit of Object.values(game.state.fruits)) {
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    const currentPlayer = game.state.players[currentPlayerId]

    if(currentPlayer) {
        context.fillStyle = '#d01050'
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
    }

    updateScoreTable(scoreTable, game, currentPlayerId)

    requestAnimationFrame(renderScreen.bind(null, screen, scoreTable, game, requestAnimationFrame, currentPlayerId))
}

function updateScoreTable(scoreTable, game, currentPlayerId) {
    const maxResults = 10

    let scoreTableInnerHTML = `
    <tr class="header">
        <td>Top 10 Jogadores</td>
        <td>Pontos</td>
    </tr>`

    const playersArray = []

    for (let socketId in game.state.players) {
        const player = game.state.players[socketId]
        playersArray.push({
            playerId: socketId, //<--- Nome do Player TABELA
            x: player.x,
            y: player.y,
            score: player.score,
        })
    }
    
    const playersSortedByScore = playersArray
    .sort((first, second) => second.score - first.score)
    .slice(0, maxResults)

    const topScorePlayers = playersSortedByScore.slice(0, maxResults)

    scoreTableInnerHTML = topScorePlayers.reduce((stringFormed, player) => {
        return stringFormed + `
            <tr ${player.playerId === currentPlayerId ? 'class="current-player"' : ''}>
                <td>${player.playerId}  </td>
                <td>${player.score}</td>
            </tr>
        `
        // NOME DO JOGADOR
    }, scoreTableInnerHTML)

    const currentPlayerFromTopScore = topScorePlayers[currentPlayerId]

    if (currentPlayerFromTopScore) {
        scoreTableInnerHTML += `
            <tr class="current-player bottom">
                <td class="socket-id">${currentPlayerFromTopScore.id} EU </td>
                <td class="score-value">${currentPlayerFromTopScore.score}</td>
            </tr>
        `
    }

    scoreTable.innerHTML = scoreTableInnerHTML
}
