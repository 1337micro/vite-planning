export interface IVote {
  vote: string;
  roomId: string;
}

export class Vote implements IVote {
  vote: string;
  roomId: string;

  constructor(vote: string, roomId: string) {
    this.vote = vote;
    this.roomId = roomId;
  }
}
