import type { Socket } from "socket.io";
import { useParams } from "react-router";
import Skeleton from "@mui/material/Skeleton";
import { useJoinRoom } from "./hooks/eventHandlers/useJoinRoom.ts";
import { JoinModal } from "./components/JoinModal.tsx";
import { Table } from "./components/Table.tsx";
import { VotingBallots } from "./components/VotingBallots.tsx";
import _ from "lodash";

interface IGameProps {
  socket: Socket;
}
export function Game(props: IGameProps) {
  const { socket } = props;
  const { roomId } = useParams();

  const { room, joinRoom } = useJoinRoom(socket, roomId!);

  const handleJoin = (playerName: string) => {
    joinRoom(playerName);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <JoinModal onJoin={handleJoin} />
      {_.isNil(room) ? (
        <Skeleton />
      ) : (
        <>
          <Table room={room} socket={socket} />
          <VotingBallots
            socket={socket}
            room={room}
            votes={room.votes || ["0", "1", "2", "3", "5", "8", "13"]}
            roomId={roomId!}
          />
        </>
      )}
    </div>
  );
}
