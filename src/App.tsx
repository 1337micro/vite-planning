import { useStartGame } from "./hooks/eventHandlers/useStartGame.ts";
import Button from "@mui/material/Button";
import {
  Box,
  Container,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import { Casino, PlayArrow, GitHub } from "@mui/icons-material";
import { useState } from "react";
import { parseVotingBallotOptions } from "./utils/utils.ts";

import type { Socket } from "socket.io";

import "./App.css";

interface IAppProps {
  socket: Socket;
}

function App(props: IAppProps) {
  const { socket } = props;

  const { startNewGame } = useStartGame(socket);

  const [votesInput, setVotesInput] = useState<string>("0,1,2,3,5,8,13");

  const handleStartNewGame = () => {
    const votes = parseVotingBallotOptions(votesInput);
    startNewGame(votes);
  };

  return (
    <>
      {/* GitHub Icon */}
      <IconButton
        component="a"
        href="https://github.com/1337micro/vite-planning"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View source code on GitHub"
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "black",
          "&:hover": {
            color: "#1565c0",
            backgroundColor: "rgba(25, 118, 210, 0.04)",
          },
          zIndex: 10,
        }}
      >
        <GitHub sx={{ fontSize: 32 }} />
      </IconButton>
      <Container maxWidth="lg" sx={{ py: 4, position: "relative" }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Casino sx={{ fontSize: 60, color: "#1976d2", mb: 2 }} />
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Planning Poker
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Agile estimation made simple and collaborative
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 600, mx: "auto" }}
          >
            Estimate user stories efficiently with your team using the proven
            Planning Poker technique. Create consensus-driven estimates in
            real-time.
          </Typography>

          {/* Voting Options Input */}
          <Box sx={{ mb: 3, maxWidth: 400, mx: "auto" }}>
            <TextField
              id="votes"
              label="Voting Options (comma-separated)"
              variant="outlined"
              value={votesInput}
              onChange={(event) => setVotesInput(event.target.value)}
              fullWidth
              helperText="Enter vote values separated by commas (e.g., 0,1,2,3,5,8,13)"
            />
          </Box>

          <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrow />}
            onClick={handleStartNewGame}
            disabled={!votesInput}
            sx={{
              px: 4,
              py: 2,
              fontSize: "1.2rem",
              bgcolor: "#1976d2",
              "&:hover": { bgcolor: "#1565c0" },
            }}
          >
            Start New Game
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default App;
