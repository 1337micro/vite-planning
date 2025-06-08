import { type IRoom, Room } from "./Room.ts";
import _ from "lodash";

export interface IGame {
  room: IRoom;
}

export class Game implements IGame {
  room: IRoom;

  constructor(game?: IGame) {
    if (_.isNil(game)) {
      this.room = new Room();
    } else {
      this.room = game.room;
    }
  }
}
