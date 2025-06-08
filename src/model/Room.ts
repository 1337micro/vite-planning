import {IUser} from "./User";


export interface IRoom {
    id: string,
    users: IUser
}


export class Room implements IRoom {

}