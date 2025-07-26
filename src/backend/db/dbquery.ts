import sql from "./db.js";
import type { IRoom } from "../../model/Room.ts";
import type { IUser } from "../../model/User.ts";

//Room management
export async function getRoomById(roomId: string) {
  console.log("roomId in getRoomById", roomId);
  const [room, users] = await sql.begin(async (sql) => {
    const [room] = await sql`
    select
      id, userids, revealed, votes
    from Rooms
    where id = ${roomId}
  `;
    let users;
    if (room.userids) {
      users = await sql`
      select
        id, name, vote
      from Users
      where id = ANY(${room.userids})
      order by id
    `;
    }

    return [room, users];
  });

  room.users = users;
  return room;
}

export async function createRoom(room: IRoom) {
  console.log("room in createRoom", room);
  await sql`
    INSERT INTO Rooms (id, votes) VALUES (${room.id}, ${room.votes})
  `;
}

export async function saveRoom(room: IRoom) {
  console.log("room in saveRoom", room);
  const userIds = room.users.map((user) => user.id);

  await sql`
    UPDATE Rooms
      SET userids = ${userIds}, revealed = ${room.revealed}, votes = ${room.votes}

    where id = ${room.id}
  `;
}

//User management
export async function createUser(user: IUser) {
  console.log("user in saveUser", user);

  await sql`
    INSERT INTO Users (id, name, roomId) VALUES (${user.id}, ${user.name}, ${user.roomId})
    ON CONFLICT (id) DO NOTHING
  `;
}
export async function getUserById(userId: string) {
  console.log("getting user", userId);
  const [user] = await sql`
      select
        id, name, vote, roomid
      from Users
      where id = ${userId}
    `;
  return user;
}

export async function deleteUser(userId: string) {
  console.log("deleting user", userId);

  await sql`
    DELETE FROM Users WHERE id = ${userId}
  `;
}

//Voting
export async function sendVote(userId: string, vote: string) {
  console.log("sendVote", userId, vote);

  await sql`
    UPDATE Users SET vote = ${vote} WHERE id = ${userId}
  `;
}

export async function clearAllVotesInRoom(roomId: string) {
  console.log("clearAllVotesInRoom", roomId);

  await sql`
    UPDATE Users SET vote = NULL WHERE roomid = ${roomId}
  `;
}
