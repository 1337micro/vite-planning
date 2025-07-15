import { EVENTS } from "../../constants/Constants.ts";
import type { Socket } from "socket.io";

export function useRestartGame(socket: Socket) {
  const restartGame = (roomId: string) => {
    socket.emit(EVENTS.RESTART_GAME, roomId);
  };

  return { restartGame };
}