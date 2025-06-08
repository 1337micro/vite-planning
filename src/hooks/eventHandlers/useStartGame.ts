import { EVENTS } from "../../constants/Constants.ts";
import type { Socket } from "socket.io";
import { useNavigate } from "react-router";

export function useStartGame(socket: Socket) {
  const navigate = useNavigate();

  const startNewGame = () => {
    socket.emit(EVENTS.START_GAME);
  };

  socket.on(EVENTS.GAME_STARTED, (room) => {
    console.log("redirecting to ", room.id);
    navigate(`/${room.id}`);
  });

  return { startNewGame };
}
