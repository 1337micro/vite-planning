import Button from "@mui/material/Button";
import { CardStyle } from "./styles/CardStyle.ts";

interface ICardProps {
  style?: object;
  voteNumber?: number;
  playerName?: string;
}
export function VotingCard(props: ICardProps = {}) {
  const { style = {}, voteNumber, playerName } = props;

  return <span style={style}>
    <Button sx={CardStyle}>{voteNumber}</Button>
    <div>{playerName}</div>
  </span>;
}
