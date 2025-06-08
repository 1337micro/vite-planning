import { EVENTS } from "../../constants/Constants.ts";
import type { Socket } from "socket.io";

export function useVote(socket: Socket, roomId: string) {
  console.log("useVote RoomId", roomId);
  const sendVote = (vote: number) => {
    socket.emit(EVENTS.SEND_VOTE, vote, roomId);
  };

  return { sendVote };
}
