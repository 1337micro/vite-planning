import {useState} from "react";
import {EVENTS} from '../../constants/Constants.ts'
import type {Socket} from "socket.io";
import type {IGame} from "../../model/Game.ts";


export function useGame(socket: Socket) {
    const [game, setGame] = useState<IGame>();

    socket.on(EVENTS.GAME_STARTED, (game: IGame) => {
        setGame(game)
    })

    const startNewGame = () => {
        socket.emit(EVENTS.START_GAME)
    }


    return {game, startNewGame}
}