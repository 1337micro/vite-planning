import {EVENTS} from '../../constants/Constants.ts'
import type {Socket} from "socket.io";

export function useVote(socket: Socket) {
    const sendVote = (vote: number) => {
        socket.emit(EVENTS.SEND_VOTE, vote)
    }

    return {sendVote}
}