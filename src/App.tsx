import { useVote } from "./hooks/eventHandlers/useVote.ts";
import { useStartGame } from "./hooks/eventHandlers/useStartGame.ts";

import type { Socket } from "socket.io";

import "./App.css";

interface IAppProps {
  socket: Socket;
}
function App(props: IAppProps) {
  const { socket } = props;

  console.log("socket ", socket);

  const { sendVote } = useVote(socket);
  const { startNewGame } = useStartGame(socket);

  return (
    <>
      <button onClick={() => startNewGame()}>Start New Game</button>
      <button onClick={() => sendVote(1)}>Send Vote</button>
    </>
  );
}

export default App;
