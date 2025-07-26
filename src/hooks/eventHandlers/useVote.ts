import { EVENTS } from "../../constants/Constants.ts";
import type { Socket } from "socket.io";

export function useVote(socket: Socket, roomId: string) {
  console.log("useVote RoomId", socket);

  const sendVote = (vote: string) => {
    const userId = socket.id;
    socket.emit(EVENTS.SEND_VOTE, userId, roomId, vote);
  };

  return { sendVote };
}
