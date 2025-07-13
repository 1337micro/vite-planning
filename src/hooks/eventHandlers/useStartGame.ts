import { EVENTS } from "../../constants/Constants.ts";
import type { Socket } from "socket.io-client";
import { useNavigate } from "react-router";

export function useStartGame(socket: Socket) {
  const navigate = useNavigate();

  const startNewGame = () => {
    // For demo purposes, create a local room
    const demoRoomId = `demo-${Date.now()}`;
    console.log("Starting demo game with room:", demoRoomId);
    navigate(`/${demoRoomId}`);
    
    // Also emit to socket if connected
    socket.emit(EVENTS.START_GAME);
  };

  socket.on(EVENTS.GAME_STARTED, (room) => {
    console.log("redirecting to ", room.id);
    navigate(`/${room.id}`);
  });

  return { startNewGame };
}
