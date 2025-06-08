import type {IRoom} from "./Room.ts";

export interface IVote {
    vote: number;
    room: IRoom;
}

export class Vote implements IVote {
    vote: number;
    room: IRoom;
    
    constructor(vote: number, room: IRoom) {
        this.vote = vote;
        this.room = room;
    }

}