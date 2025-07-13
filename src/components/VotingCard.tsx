import Button from "@mui/material/Button";
import { getPlayerCardStyle } from "./styles/GetPlayerCardStyle.ts";
import type { Socket } from "socket.io";
import type { IUser } from "../model/User.ts";
import _ from "lodash";

interface ICardProps {
  style?: object;
  socket: Socket;
  user: IUser;
}
export function VotingCard(props: ICardProps) {
  const { style = {}, user, socket } = props;

  const isCurrentUser = socket.id === user.id;
  const currentUserSelectedAVote = isCurrentUser && !_.isNil(user.vote);
  return (
    <span
      style={{
        ...style,
        color: isCurrentUser ? "blue" : "black",
      }}
    >
      <Button sx={getPlayerCardStyle(currentUserSelectedAVote)}>
        {currentUserSelectedAVote ? user.vote : null}
      </Button>
      <h3>{user.name}</h3>
    </span>
  );
}
