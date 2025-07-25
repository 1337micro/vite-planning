import { EVENTS } from "../../constants/Constants.ts";
import type { Socket } from "socket.io";
import { useState } from "react";
import type { IRoom } from "../../model/Room.ts";

export function useJoinRoom(socket: Socket, roomId?: string) {
  const [room, setRoom] = useState<IRoom>();

  const joinRoom = (playerName: string) => {
    socket.emit(EVENTS.JOIN_GAME, roomId, playerName);
  };

  socket.on(EVENTS.GAME_JOINED, (room: IRoom) => {
    setRoom(room);
  });

  socket.on(EVENTS.UPDATE_GAME, (room: IRoom) => {
    setRoom(room);
  });

  return { room, joinRoom };
}
