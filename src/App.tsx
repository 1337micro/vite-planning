import { useStartGame } from "./hooks/eventHandlers/useStartGame.ts";
import Button from "@mui/material/Button";
import { Box, Container, Typography } from "@mui/material";
import { Casino, PlayArrow } from "@mui/icons-material";

import type { Socket } from "socket.io";

import "./App.css";

interface IAppProps {
  socket: Socket;
}

function App(props: IAppProps) {
  const { socket } = props;

  console.log("socket ", socket);
  const { startNewGame } = useStartGame(socket);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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

        <Button
          variant="contained"
          size="large"
          startIcon={<PlayArrow />}
          onClick={() => startNewGame()}
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
  );
}

export default App;
