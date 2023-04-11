export default function createKeyboardListener(document) {
    const state = {
      observers: [], // array de funções observadoras
      playerId: null // ID do jogador
    };
  
    // Registra o ID do jogador
    function registerPlayerId(playerId) {
      state.playerId = playerId;
    }
  
    // Inscreve uma função observadora
    function subscribe(observerFunction) {
      state.observers.push(observerFunction);
    }
  
    // Cancela a inscrição de todas as funções observadoras
    function unsubscribeAll() {
      state.observers = []; // atribui uma nova matriz vazia
    }
  
    // Notifica todas as funções observadoras com um comando
    function notifyAll(command) {
      // usa o spread operator para copiar o array de observadores
      // e evitar a mutação do objeto de estado original
      [...state.observers].forEach(observerFunction => {
        observerFunction(command);
      });
    }
  
    // Adiciona um ouvinte de teclado que notifica as funções observadoras
    document.addEventListener("keydown", event => {
      const keyPressed = event.key;
      const command = {
        type: "move-player",
        playerId: state.playerId,
        keyPressed
      };
      notifyAll(command);
    });
  
    // Retorna um objeto com métodos para interagir com o ouvinte de teclado
    return {
      subscribe, // inscreve uma função observadora
      unsubscribeAll, // cancela a inscrição de todas as funções observadoras
      registerPlayerId // registra o ID do jogador
    };
  }
