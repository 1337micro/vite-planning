import { EVENTS } from "../../constants/Constants.ts";
import type { Socket } from "socket.io-client";
import { useState } from "react";
import type { IRoom } from "../../model/Room.ts";
import { Room } from "../../model/Room.ts";
import { User } from "../../model/User.ts";

export function useJoinRoom(socket: Socket, roomId?: string) {
  const [room, setRoom] = useState<IRoom>();

  const joinRoom = (playerName: string) => {
    // For demo mode, create a local room if it's a demo room
    if (roomId?.startsWith('demo-')) {
      const demoUser = new User({
        id: socket.id || 'demo-user-1',
        name: playerName,
        vote: null,
        roomId: roomId
      });
      
      const demoRoom = new Room({
        id: roomId,
        users: [demoUser],
        toDb: () => ({ id: roomId, userIds: [demoUser.id] })
      });
      
      console.log("Created demo room:", demoRoom);
      setRoom(demoRoom);
      return;
    }
    
    // Normal socket behavior
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
