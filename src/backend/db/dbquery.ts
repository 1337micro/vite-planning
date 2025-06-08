import sql from './db.js'
import type { IRoom } from "../../model/Room.ts";


export async function getRoomById(roomId: string){
  console.log('roomId in getRoomById', roomId)
    const room = await sql`
    select
      room
    from Rooms
    where id == ${roomId}
  `
  console.log("Fetched room", room)
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
      SET userIds = ${userIds}

    where id = ${room.id}
  `
}

