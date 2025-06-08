import {useVote} from "./hooks/eventHandlers/useVote.ts";
import {useStartGame} from "./hooks/eventHandlers/useStartGame.ts";

import {useContext} from "react";
import {SocketContext} from "./context/SocketContext.ts";

import './App.css'



function App() {
  const {socket} = useContext(SocketContext)
    console.log('socket ', socket)

  const {sendVote} = useVote(socket);
  const {startNewGame} = useStartGame(socket);

  return (
<>
        <button onClick={() => startNewGame()}>
           Start New Game
      </button>
        <button onClick={() => sendVote(1)}>
            Send Vote
        </button>

    </>
  )
}

export default App
