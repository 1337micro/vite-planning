import { EVENTS } from "../../constants/Constants.ts";
import type { Socket } from "socket.io";

export function useRevealCards(socket: Socket) {
  const revealCards = (roomId: string) => {
    socket.emit(EVENTS.REVEAL_CARDS, roomId);
  };

  return { revealCards };
}