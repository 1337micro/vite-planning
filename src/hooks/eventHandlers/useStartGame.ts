import {EVENTS} from '../../constants/Constants.ts'
import type {Socket} from "socket.io";



export function useStartGame(socket: Socket) {
    const startNewGame = () => {
        socket.emit(EVENTS.START_GAME)
    }


    return {startNewGame}
}