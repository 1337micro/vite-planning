import { EVENTS } from "../../constants/Constants.ts";
import type { Socket } from "socket.io-client";
import { useState } from "react";

export function useVote(socket: Socket, roomId: string) {
  console.log("useVote RoomId", socket);
  const [selectedBallot, setSelectedBallot] = useState<string>();

  const sendVote = (vote: string) => {
    const userId = socket.id;
    socket.emit(EVENTS.SEND_VOTE, userId, roomId, vote);
    setSelectedBallot(vote);
  };

  return { sendVote, selectedBallot };
}
