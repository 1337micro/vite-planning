import { EVENTS } from "../../constants/Constants.ts";
import type { Socket } from "socket.io";
import { useEffect, useState } from "react";
import type { IGame } from "../../model/Game.ts";

export function useJoinGame(socket: Socket, roomId?: string) {
  const [game, setGame] = useState<IGame>();

  useEffect(() => {
    socket.emit(EVENTS.JOIN_GAME, roomId);
  }, [socket, roomId]);

  socket.on(EVENTS.GAME_JOINED, (game: IGame) => {
    setGame(game);
  });

  return { game };
}
