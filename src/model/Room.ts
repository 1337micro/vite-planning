import type { IUser } from "./User";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

//The room as stored in the database
export interface IRoomDB {
  id: string;
  userIds: string[];
  revealed?: boolean;
  votes?: string[];
}

export interface IRoom {
  id: string;
  users: IUser[];
  revealed?: boolean;
  votes?: string[];
  toDb: () => IRoomDB;
}

export class Room implements IRoom {
  id: string;
  users: IUser[];
  revealed?: boolean;
  votes?: string[];

  constructor(room?: IRoom) {
    if (_.isNil(room)) {
      this.id = uuidv4();
      this.users = [];
      this.revealed = false;
      this.votes = ["0", "1", "2", "3", "5", "8", "13"]; // Default votes
    } else {
      this.id = room.id;
      this.users = room.users ?? [];
      this.revealed = room.revealed ?? false;
      this.votes = room.votes ?? ["0", "1", "2", "3", "5", "8", "13"]; // Default votes if not provided
    }
  }

  addUserToGame(user: IUser) {
    this.users.push(user);
    //resort the users array by socket id
    this.users.sort((a, b) => a.id.localeCompare(b.id));
  }

  revealCards() {
    this.revealed = true;
  }

  restartGame() {
    this.revealed = false;
  }

  toDb() {
    return {
      id: this.id,
      userIds: this.users.map((u) => u.id),
      revealed: this.revealed,
      votes: this.votes,
    };
  }
}
