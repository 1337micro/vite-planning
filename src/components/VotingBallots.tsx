import { CardStyle } from "./styles/CardStyle.ts";
import Button from "@mui/material/Button";
import type { Socket } from "socket.io";
import { useVote } from "../hooks/eventHandlers/useVote.ts";
import Grid from "@mui/material/Grid";

interface IVotingBallotsProps {
  socket: Socket;
  roomId: string;
  votingNumbers: number[];
}

export function VotingBallots(props: IVotingBallotsProps) {
  const { socket, roomId, votingNumbers } = props;

  const { sendVote } = useVote(socket, roomId);

  return (
    <Grid container spacing={2}>
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
    </Grid>
  );
}
