import type { IUser } from "./User";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

export interface IRoom {
  id: string;
  users: IUser[];
}

export class Room implements IRoom {
  id: string;
  users: IUser[];

  constructor(room?: IRoom) {
    if (_.isNil(room)) {
      this.id = uuidv4();
      this.users = [];
    } else {
      this.id = room.id;
      this.users = room.users ?? [];
    }
  }

  addUserToGame(user: IUser) {
    this.users.push(user);
  }
}
