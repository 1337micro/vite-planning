import { useStartGame } from "./hooks/eventHandlers/useStartGame.ts";
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  Grid,
  Chip
} from "@mui/material";
import { 
  Casino, 
  Groups, 
  Timer, 
  BarChart, 
  PlayArrow,
  Add
} from "@mui/icons-material";

import type { Socket } from "socket.io-client";

import "./App.css";

interface IAppProps {
  socket: Socket;
}

function App(props: IAppProps) {
  const { socket } = props;
  const { startNewGame } = useStartGame(socket);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Casino sx={{ fontSize: 60, color: "#1976d2", mb: 2 }} />
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
          Planning Poker
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Agile estimation made simple and collaborative
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: "auto" }}>
          Estimate user stories efficiently with your team using the proven Planning Poker technique. 
          Create consensus-driven estimates in real-time.
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
            "&:hover": { bgcolor: "#1565c0" }
          }}
        >
          Start New Game
        </Button>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
            <CardContent>
              <Groups sx={{ fontSize: 48, color: "#4caf50", mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Team Collaboration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Real-time voting with your entire team. See who has voted and track progress.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
            <CardContent>
              <Casino sx={{ fontSize: 48, color: "#ff9800", mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Fibonacci Cards
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Use proven estimation cards: 1, 2, 3, 5, 8, 13, 21, ?, ☕ for accurate story pointing.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
            <CardContent>
              <Timer sx={{ fontSize: 48, color: "#9c27b0", mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Timer & Control
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Built-in session timer to keep estimations focused and time-boxed.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
            <CardContent>
              <BarChart sx={{ fontSize: 48, color: "#f44336", mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Results & Export
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Detailed voting statistics, consensus detection, and export capabilities.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* How it Works */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          How It Works
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3 }}>
              <Chip label="1" sx={{ mb: 2, bgcolor: "#1976d2", color: "white", fontSize: "1.2rem" }} />
              <Typography variant="h6" gutterBottom>
                Create Room
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start a new planning session and invite your team members to join.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3 }}>
              <Chip label="2" sx={{ mb: 2, bgcolor: "#1976d2", color: "white", fontSize: "1.2rem" }} />
              <Typography variant="h6" gutterBottom>
                Present Story
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Share the user story details and let the team discuss requirements.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3 }}>
              <Chip label="3" sx={{ mb: 2, bgcolor: "#1976d2", color: "white", fontSize: "1.2rem" }} />
              <Typography variant="h6" gutterBottom>
                Vote & Reveal
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Everyone votes privately, then reveal results to find consensus.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* CTA Section */}
      <Card sx={{ bgcolor: "#f3f4f6", textAlign: "center", p: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Ready to start estimating?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Create your first Planning Poker session and experience collaborative estimation.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Add />}
            onClick={() => startNewGame()}
            sx={{ 
              px: 4, 
              py: 2,
              bgcolor: "#4caf50",
              "&:hover": { bgcolor: "#388e3c" }
            }}
          >
            Create New Session
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
