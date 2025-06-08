import {EVENTS} from '../../constants/Constants.ts'
import type {Socket} from "socket.io";
import {useState} from "react";
import type {IGame} from "../../model/Game.ts";


export function useJoinGame(socket: Socket, gameId: string) {

    const [game, setGame] = useState<IGame>();

    useEffect(()=>{
        socket.emit(EVENTS.JOIN_GAME)
    },[socket, gameId])


    socket.on(EVENTS.GAME_JOINED, (game: IGame) => {
        setGame(game)
    })

    return {game}
}