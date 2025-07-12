import Card from "@mui/material/Card";
import type { IRoom } from "../model/Room.ts";
import { VotingCard } from "./VotingCard.tsx";

interface TableProps {
  room: IRoom
}
export function Table(props: TableProps) {
  const {room} = props;

  const users = room?.users;

  return (
    <div style={{
           height: "25rem",
           width: "34rem"
         }}>
      {users.map( (user, userIndex) => {
        const indexIsEven = userIndex % 2 === 0;
        return <>
          <VotingCard
            style={{
              position: 'relative',
              bottom: indexIsEven ? '100%': 0
            }}
            voteNumber={user.vote}
          />
        </>
      })}
    <Card
      sx={{
        borderRadius: "3rem",
        background: "#d7e9ff",
        height: "15rem",
        width: "34rem",
      }}
    ></Card>
    </div>
  );
}
