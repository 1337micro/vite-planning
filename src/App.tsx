import { useStartGame } from "./hooks/eventHandlers/useStartGame.ts";
import Button from "@mui/material/Button";

import type { Socket } from "socket.io";

import "./App.css";

interface IAppProps {
  socket: Socket;
}
function App(props: IAppProps) {
  const { socket } = props;

  console.log("socket ", socket);
  const { startNewGame } = useStartGame(socket);

  return (
    <>
      <Button onClick={() => startNewGame()}>Start New Game</Button>
    </>
  );
}

export default App;
