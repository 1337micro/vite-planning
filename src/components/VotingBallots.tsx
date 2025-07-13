import { getVotingBallotCardStyle } from "./styles/GetPlayerCardStyle.ts";
import { Button, Box, Typography } from "@mui/material";
import type { Socket } from "socket.io-client";
import { useVote } from "../hooks/eventHandlers/useVote.ts";

interface IVotingBallotsProps {
  socket: Socket;
  votes: string[];
  roomId: string;
}

export function VotingBallots(props: IVotingBallotsProps) {
  const { socket, votes, roomId } = props;

  const { sendVote, selectedBallot } = useVote(socket, roomId);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
        Select your estimate:
      </Typography>
      <Box sx={{ 
        display: "flex", 
        gap: 2, 
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
        {votes.map((voteNumber) => {
          const isSelected = selectedBallot === voteNumber;
          return (
            <Button
              key={voteNumber}
              sx={{
                ...getVotingBallotCardStyle(isSelected),
                minWidth: 60,
                height: 90,
                fontSize: "1.2rem",
                fontWeight: "bold",
                borderRadius: 2,
                boxShadow: isSelected ? "0 8px 16px rgba(0,0,0,0.3)" : "0 4px 8px rgba(0,0,0,0.1)",
                transform: isSelected ? "translateY(-4px)" : "none",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.2)"
                }
              }}
              onClick={() => {
                sendVote(voteNumber);
              }}
            >
              {voteNumber}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
