import { CardStyle } from "./styles/CardStyle.ts";
import Button from "@mui/material/Button";

interface IVotingBallotsProps {
  votingNumbers: number[];
}

export function VotingBallots(props: IVotingBallotsProps = {}) {
  const { votingNumbers } = props;

  return (
    <>
      {votingNumbers.map((voteNumber) => {
        return (
          <Button key={voteNumber} sx={CardStyle}>
            {voteNumber}
          </Button>
        );
      })}
    </>
  );
}
