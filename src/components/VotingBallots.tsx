import { getVotingBallotCardStyle } from "./styles/GetPlayerCardStyle.ts";
import Button from "@mui/material/Button";
import type { Socket } from "socket.io";
import { useVote } from "../hooks/eventHandlers/useVote.ts";
import Grid from "@mui/material/Grid";
import type { IRoom } from "../model/Room.ts";

interface IVotingBallotsProps {
  socket: Socket;
  votes: string[];
  roomId: string;
  room: IRoom;
}

export function VotingBallots(props: IVotingBallotsProps) {
  const { socket, votes, roomId, room } = props;

  const thisUser = room?.users.find((user) => user.id === socket.id);

  const { sendVote } = useVote(socket, roomId);

  return (
    <Grid container spacing={2}>
      {votes.map((voteNumber) => {
        const thisButtonIsSelected = thisUser?.vote === voteNumber;
        return (
          <Button
            key={voteNumber}
            sx={getVotingBallotCardStyle(thisButtonIsSelected)}
            onClick={() => {
              if (thisButtonIsSelected) {
                sendVote("?"); //Vote deselected - Send a question mark placeholder
              } else {
                sendVote(voteNumber);
              }
            }}
          >
            {voteNumber}
          </Button>
        );
      })}
    </Grid>
  );
}
