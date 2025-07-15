import Button from "@mui/material/Button";
import { getPlayerCardStyle } from "./styles/GetPlayerCardStyle.ts";
import type { Socket } from "socket.io";
import type { IUser } from "../model/User.ts";
import _ from "lodash";

interface ICardProps {
  style?: object;
  socket: Socket;
  user: IUser;
  revealed?: boolean;
}
export function VotingCard(props: ICardProps) {
  const { style = {}, user, socket, revealed = false } = props;

  const isCurrentUser = socket.id === user.id;
  const currentUserSelectedAVote = isCurrentUser && !_.isNil(user.vote);
  const shouldShowVote =
    currentUserSelectedAVote || (revealed && !_.isNil(user.vote));

  return (
    <span
      style={{
        ...style,
        color: isCurrentUser ? "blue" : "black",
      }}
    >
      <Button sx={getPlayerCardStyle(!_.isNil(user.vote))}>
        {shouldShowVote ? user.vote : null}
      </Button>
      <h3>{user.name}</h3>
    </span>
  );
}
