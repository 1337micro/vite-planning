import Button from "@mui/material/Button";
import { CardStyle } from "./styles/CardStyle.ts";

interface ICardProps {
  voteNumber: number;
}
export function Card(props: ICardProps = {}) {
  const { voteNumber } = props;

  return <Button sx={CardStyle}>{voteNumber}</Button>;
}
