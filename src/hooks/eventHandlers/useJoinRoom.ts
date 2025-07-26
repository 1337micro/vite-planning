import { EVENTS } from "../../constants/Constants.ts";
import type { Socket } from "socket.io";
import { useState } from "react";
import type { IRoom } from "../../model/Room.ts";

export function useJoinRoom(socket: Socket, roomId?: string) {
  const [room, setRoom] = useState<IRoom>();
  const [error, setError] = useState<string>("");

  const joinRoom = (playerName: string, votes?: string[]) => {
    setError(""); // Clear any previous errors
    socket.emit(EVENTS.JOIN_GAME, roomId, playerName, votes);
  };

  socket.on(EVENTS.GAME_JOINED, (room: IRoom) => {
    setRoom(room);
    setError(""); // Clear error on successful join
  });

  socket.on(EVENTS.UPDATE_GAME, (room: IRoom) => {
    console.log("UPDATING GAME", EVENTS.UPDATE_GAME);
    setRoom(room);
  });

  socket.on(EVENTS.ERROR, (errorData: { message: string }) => {
    setError(errorData.message);
  });

  return { room, joinRoom, error };
}
