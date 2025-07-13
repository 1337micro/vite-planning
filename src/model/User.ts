import type { IVote } from "./Vote.ts";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

export interface IUser {
  id: string;
  name: string;
  vote: IVote | null;
}

export class User implements IUser {
  id: string;
  name: string;
  vote: IVote | null;

  constructor(user?: IUser) {
    if (_.isNil(user)) {
      this.id = uuidv4();
      this.name = "Player";
      this.vote = null;
    } else {
      this.id = user.id;
      this.name = user.name;
      this.vote = user.vote;
    }
  }
}
