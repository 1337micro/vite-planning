import Card from "@mui/material/Card";
import type { IRoom } from "../model/Room.ts";
import { VotingCard } from "./VotingCard.tsx";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import type { Socket } from "socket.io";
import { useRevealCards } from "../hooks/eventHandlers/useRevealCards.ts";
import { useRestartGame } from "../hooks/eventHandlers/useRestartGame.ts";
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
  const { restartGame } = useRestartGame(socket);

  const users = room?.users;
  const hasVotes = users?.some((user) => !_.isNil(user.vote));
  const canReveal = hasVotes && !room?.revealed;
  const canRestart = room?.revealed;

  const handleRevealCards = () => {
    revealCards(roomId!);
  };

  const handleRestartGame = () => {
    restartGame(roomId!);
  };

  return (
    <div
      style={{
        marginBottom: "30px",
      }}
    >
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Reveal Cards Button - Now inside the blue table */}
            {canReveal && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleRevealCards}
              >
                Reveal Cards
              </Button>
            )}

            {/* Restart Button - Shows when cards are revealed */}
            {canRestart && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleRestartGame}
              >
                Restart
              </Button>
            )}
          </Card>
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
