import { CardStyle } from "./styles/CardStyle.ts";
import Button from "@mui/material/Button";
import type { Socket } from "socket.io";
import { useVote } from "../hooks/eventHandlers/useVote.ts";

interface IVotingBallotsProps {
  socket: Socket;
  roomId: string;
  votingNumbers: number[];
}

export function VotingBallots(props: IVotingBallotsProps = {}) {
  const { socket, roomId, votingNumbers } = props;

  const { sendVote } = useVote(socket, roomId);

  return (
    <>
      {votingNumbers.map((voteNumber) => {
        return (
          <Button
            key={voteNumber}
            sx={CardStyle}
            onClick={() => sendVote(voteNumber)}
          >
            {voteNumber}
          </Button>
        );
      })}
    </>
  );
}
