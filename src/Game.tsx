import type {Socket} from "socket.io";
import {useParams} from "react-router";
import {SocketContext} from "./context/SocketContext.ts";

export function Game() {
    const socket: Socket = useContext(SocketContext);
    const {gameId} = useParams();

    const {game} = useJoinGame(socket, gameId)
    return (
        <>{JSON.stringify(game)}</>
    )
}