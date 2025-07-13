import { getVotingBallotCardStyle } from "./styles/GetPlayerCardStyle.ts";
import Button from "@mui/material/Button";
import type { Socket } from "socket.io-client";
import { useVote } from "../hooks/eventHandlers/useVote.ts";
import Grid from "@mui/material/Grid";

interface IVotingBallotsProps {
  socket: Socket;
  votes: string[];
  roomId: string;
}

export function VotingBallots(props: IVotingBallotsProps) {
  const { socket, votes, roomId } = props;

  const { sendVote, selectedBallot } = useVote(socket, roomId);

  return (
    <Grid container spacing={2}>
      {votes.map((voteNumber) => {
        return (
          <Button
            key={voteNumber}
            sx={getVotingBallotCardStyle(selectedBallot === voteNumber)}
            onClick={() => {
              sendVote(voteNumber);
            }}
          >
            {voteNumber}
          </Button>
        );
      })}
    </Grid>
  );
}
