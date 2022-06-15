export default function createKeyboardListner(document) {
    const state = {
        observers: []
    }

    function subscribe(observersFuncion) {
        state.observers.push(observersFuncion)
    }

    function notifyAll(command) {
        console.log(`Notifying ${state.observers.length} observers`)

        for (const observersFuncion of state.observers) {
            observersFuncion(command)
        }
    }

    document.addEventListener('keydown', handleKeydown)

    function handleKeydown(event) {
        const keyPressed = event.key

        const command = {
            playerId: 'player1',
            keyPressed
        }

        notifyAll(command)
    }

    return {
        subscribe
    }
}