import type { IUser } from "./User";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

//The room as stored in the database
export interface IRoomDB {
  id: string;
  userIds: string[];
  revealed?: boolean;
}

export interface IRoom {
  id: string;
  users: IUser[];
  revealed?: boolean;
  toDb: () => IRoomDB;
}

export class Room implements IRoom {
  id: string;
  users: IUser[];
  revealed?: boolean;

  constructor(room?: IRoom) {
    if (_.isNil(room)) {
      this.id = uuidv4();
      this.users = [];
      this.revealed = false;
    } else {
      this.id = room.id;
      this.users = room.users ?? [];
      this.revealed = room.revealed ?? false;
    }
  }

  addUserToGame(user: IUser) {
    this.users.push(user);
  }

  revealCards() {
    this.revealed = true;
  }

  toDb() {
    return {
      id: this.id,
      userIds: this.users.map((u) => u.id),
      revealed: this.revealed,
    };
  }
}
