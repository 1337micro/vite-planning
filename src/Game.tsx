import type { Socket } from "socket.io";
import { useParams } from "react-router";
import { useJoinGame } from "./hooks/eventHandlers/useJoinGame.ts";
import { Card } from "./components/Card.tsx";
import { Table } from "./components/Table.tsx";
import { VotingBallots } from "./components/VotingBallots.tsx";

interface IGameProps {
  socket: Socket;
}
export function Game(props: IGameProps) {
  const { socket } = props;
  const { roomId } = useParams();

  const { game } = useJoinGame(socket, roomId);

  return (
    <>
      <Card voteNumber={1} />
      <Table />
      <VotingBallots votingNumbers={[1, 2, 3, 5, 8, 13]} />
      {JSON.stringify(game)}
    </>
  );
}
