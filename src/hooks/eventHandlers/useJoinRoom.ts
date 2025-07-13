import { EVENTS } from "../../constants/Constants.ts";
import type { Socket } from "socket.io-client";
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
    console.log("UPDATING GAME", EVENTS.UPDATE_GAME);
    setRoom(room);
  });

  return { room, joinRoom };
}
