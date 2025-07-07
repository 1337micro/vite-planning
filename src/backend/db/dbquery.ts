import sql from './db.js'
import type { IRoom } from "../../model/Room.ts";
import type { IUser } from "../../model/User.ts";


export async function getRoomById(roomId: string){
  console.log('roomId in getRoomById', roomId)
  const [room, users] = await sql.begin(async sql => {
    const [room] = await sql`
    select
      id, userids
    from Rooms
    where id = ${roomId}
  `

  const listOfUserIds = room.userids.reduce((prev, curr) => prev+ `"${curr}",`, '')

  let users;

  if(listOfUserIds) {
    users = await sql`
      select
        id, name, vote
      from Users
      where id IN (${room.userids})
    `
  }

    return [room, users]
  });

  room.users = users;
  return room
}

export async function createRoom(room: IRoom){
  console.log('room in createRoom', room)
    await sql`
    INSERT INTO Rooms (id) VALUES (${room.id})
  `
}


export async function saveRoom(room: IRoom){
  console.log('room in saveRoom', room)
  const userIds = room.users.map(user => user.id);

    await sql`
    UPDATE Rooms
      SET userids = ${userIds}

    where id = ${room.id}
  `
}


export async function createUser(user: IUser){
  console.log('user in saveUser', user)

    await sql`
    INSERT INTO Users (id, name) VALUES (${user.id}, ${user.name})
    ON CONFLICT (id) DO NOTHING
  `
}


