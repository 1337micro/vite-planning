import Card from "@mui/material/Card";
import type { IRoom } from "../model/Room.ts";
import { VotingCard } from "./VotingCard.tsx";
import Grid from '@mui/material/Grid';

interface TableProps {
  room: IRoom
}
export function Table(props: TableProps) {
  const {room} = props;

  const users =  [
    {id: "s4Md1mdryEO9V5i0AAAD", name: "fyjgdfk", vote: null},
  {id: "gVvF-SnyPu8TxhC_AAAF", name: "dftgyjdtgfy", vote: undefined},
  {id: "gVvF-SnyPu8TxhC_AAAF", name: "dftgyjdtgfy", vote: undefined},
  {id: "gVvF-SnyPu8TxhC_AAAF", name: "dftgyjdtgfy", vote: undefined},
  {id: "gVvF-SnyPu8TxhC_AAAF", name: "dftgyjdtgfy", vote: undefined},

    ]
  //room?.users;

  return (
    <div style={{
      marginBottom: "30px"
    }}>

      <Grid container>
      {users.map( (user, userIndex) => {
        const indexIsEven = userIndex % 2 === 0;
        return indexIsEven ? <Grid>
          <VotingCard
            style={{
              position: 'relative',
              left: 30 * userIndex
            }}
            playerName={user.name}
            voteNumber={user.vote}
          />
        </Grid> : null
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
            </Grid >
        </Grid>

        <Grid container>
          {users.map( (user, userIndex) => {
            const indexIsEven = userIndex % 2 === 0;
            return !indexIsEven ? <Grid>
              <VotingCard
                style={{
                  position: 'relative',
                  left: 30 * userIndex
                }}
                playerName={user.name}
                voteNumber={user.vote}
              />
            </Grid> : null
          })}
      </Grid>

    </div>
  );
}
