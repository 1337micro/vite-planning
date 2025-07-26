import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { NameInput } from "./NameInput.tsx";
import Grid from "@mui/material/Grid";
import { Login } from "@mui/icons-material";

interface IJoinModalProps {
  onJoin: (playerName: string, votes?: string[]) => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function JoinModal(props: IJoinModalProps) {
  const { onJoin } = props;

  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  const [playerName, setPlayerName] = useState<string>("");
  const [votesInput, setVotesInput] = useState<string>("0,1,2,3,5,8,13");

  const parseVotes = (votesString: string): string[] => {
    return votesString
      .split(",")
      .map(vote => vote.trim())
      .filter(vote => vote.length > 0);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Enter Your Name"
        aria-describedby="Enter the player name you wish to use"
      >
        <Box sx={style}>
          <Grid container justifyContent="center" alignItems="center">
            <NameInput onChange={setPlayerName} />
          </Grid>
          <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
            <TextField
              id="votes"
              label="Voting Options (comma-separated)"
              variant="outlined"
              value={votesInput}
              onChange={(event) => setVotesInput(event.target.value)}
              fullWidth
              helperText="Enter vote values separated by commas (e.g., 0,1,2,3,5,8,13)"
            />
          </Grid>
          <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Login />}
              onClick={() => {
                const votes = parseVotes(votesInput);
                onJoin(playerName, votes);
                handleClose();
              }}
              disabled={!playerName || !votesInput}
              sx={{
                px: 4,
                py: 2,
                fontSize: "1.2rem",
                bgcolor: "#1976d2",
                "&:hover": { bgcolor: "#1565c0" },
              }}
            >
              Join Game
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
