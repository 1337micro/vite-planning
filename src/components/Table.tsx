import Card from "@mui/material/Card";
import type { IRoom } from "../model/Room.ts";
import { VotingCard } from "./VotingCard.tsx";
import Grid from "@mui/material/Grid";

interface TableProps {
  room: IRoom;
}
export function Table(props: TableProps) {
  const { room } = props;

  const users = room?.users;

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
            <Grid sx={{ marginBottom: 2 }}>
              <VotingCard
                style={{
                  position: "relative",
                  left: 30 * userIndex,
                }}
                playerName={user.name}
                voteNumber={user.vote}
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
            <Grid sx={{ marginTop: 2 }}>
              <VotingCard
                style={{
                  position: "relative",
                  left: 30 * userIndex,
                }}
                playerName={user.name}
                voteNumber={user.vote}
              />
            </Grid>
          ) : null;
        })}
      </Grid>
    </div>
  );
}
