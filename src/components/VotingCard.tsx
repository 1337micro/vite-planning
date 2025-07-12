import Button from "@mui/material/Button";
import { CardStyle } from "./styles/CardStyle.ts";

interface ICardProps {
  style?: object;
  voteNumber?: number;
}
export function VotingCard(props: ICardProps = {}) {
  const { style = {}, voteNumber } = props;

  const newStyle = {...CardStyle, ...style};

  return <Button sx={newStyle}>{voteNumber}</Button>;
}
