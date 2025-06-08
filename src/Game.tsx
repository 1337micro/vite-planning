import type { Socket } from "socket.io";
import { useParams } from "react-router";
import {useJoinGame} from "./hooks/eventHandlers/useJoinGame.ts";

interface IGameProps {
    socket: Socket
}
export function Game(props: IGameProps) {
  const {socket} = props;
  const { roomId } = useParams();

  const { game } = useJoinGame(socket, roomId);

  return <>{JSON.stringify(game)}</>;
}
