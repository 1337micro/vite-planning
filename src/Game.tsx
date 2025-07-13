import type { Socket } from "socket.io-client";
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

  const { room, joinRoom } = useJoinRoom(socket, roomId);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <JoinModal onJoin={joinRoom} />
      {_.isNil(room) ? (
        <Skeleton />
      ) : (
        <>
          <Table room={room} socket={socket} />
          <VotingBallots
            socket={socket}
            votes={["0", "1", "2", "3", "5", "8", "13"]}
            roomId={roomId || ""}
          />
        </>
      )}
    </div>
  );
}
