import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import useSocket from "./hooks/useSocket.ts";
import {useVote} from "./hooks/eventHandlers/useVote.ts";
import {useGame} from "./hooks/eventHandlers/useGame.ts";

import './App.css'

function App() {
  const {socket} = useSocket()
  const {sendVote} = useVote(socket);
  const {game, startNewGame} = useGame(socket);
  console.log(game)
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => startNewGame()}>
           Start New Game
      </button>
        <button onClick={() => sendVote(1)}>
            Send Vote
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
