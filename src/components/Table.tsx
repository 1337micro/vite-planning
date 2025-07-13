import Card from "@mui/material/Card";
import type { IRoom } from "../model/Room.ts";
import { VotingCard } from "./VotingCard.tsx";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import type { Socket } from "socket.io";
import { useRevealCards } from "../hooks/eventHandlers/useRevealCards.ts";
import { useParams } from "react-router";
import _ from "lodash";

interface TableProps {
  room: IRoom;
  socket: Socket;
}
export function Table(props: TableProps) {
  const { room, socket } = props;
  const { roomId } = useParams();
  const { revealCards } = useRevealCards(socket);

  const users = room?.users;
  const hasVotes = users?.some(user => !_.isNil(user.vote));
  const canReveal = hasVotes && !room?.revealed;

  const handleRevealCards = () => {
    if (roomId) {
      revealCards(roomId);
    }
  };

  return (
    <div
      style={{
        marginBottom: "30px",
      }}
    >
      {/* Reveal Cards Button */}
      {canReveal && (
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleRevealCards}
            sx={{ mb: 2 }}
          >
            Reveal Cards
          </Button>
        </Box>
      )}

      <Grid container>
        {users.map((user, userIndex) => {
          const indexIsEven = userIndex % 2 === 0;
          return indexIsEven ? (
            <Grid sx={{ marginBottom: 2 }} key={user.id}>
              <VotingCard
                style={{
                  position: "relative",
                  left: 30 * userIndex + 30,
                }}
                socket={socket}
                user={user}
                revealed={room?.revealed}
              />
            </Grid>
          ) : null;
        })}
      </Grid>

      <Grid container>
        <Grid>
          <Card
            sx={{
              borderRadius: "3rem",
              background: "#d7e9ff",
              height: "15rem",
              width: "34rem",
            }}
          ></Card>
        </Grid>
      </Grid>

      <Grid container>
        {users.map((user, userIndex) => {
          const indexIsEven = userIndex % 2 === 0;
          return !indexIsEven ? (
            <Grid sx={{ marginTop: 2 }} key={user.id}>
              <VotingCard
                style={{
                  position: "relative",
                  left: 30 * userIndex,
                }}
                socket={socket}
                user={user}
                revealed={room?.revealed}
              />
            </Grid>
          ) : null;
        })}
      </Grid>
    </div>
  );
}
