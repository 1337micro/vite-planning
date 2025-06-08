import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { NameInput } from "./NameInput.tsx";

interface IJoinModalProps {
  onJoin: (playerName) => void;
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

export function JoinModal(props: IJoinModalProps = {}) {
  const { onJoin } = props;

  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  const [playerName, setPlayerName] = useState<string>();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Enter Your Name"
        aria-describedby="Enter the player name you wish to use"
      >
        <Box sx={style}>
          <NameInput onChange={setPlayerName} />
          <Button
            onClick={() => {
              onJoin(playerName);
              handleClose();
            }}
          >
            Join Game
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
