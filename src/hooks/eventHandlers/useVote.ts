// @ts-expect-error Constants must be re-used between nodejs backend (non-typescript) and frontend (typescript)
import {EVENTS} from '../../constants/Constants.js'
import type {Socket} from "socket.io";

export function useVote(socket: Socket) {
    const sendVote = (vote: number) => {
        socket.emit(EVENTS.SEND_VOTE, vote)
    }


    return {sendVote}
}