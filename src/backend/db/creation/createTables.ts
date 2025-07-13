import sql from "../db.js";

export async function createTables() {
  await createRoomTable();
  await createUserTable();
}

async function createRoomTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS Rooms (
        id uuid UNIQUE,
        userIds varchar(20)[]
    )
  `;
}

async function createUserTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS Users (
        id varchar(20) UNIQUE,
        name varchar(128),
        vote varchar(128),
        roomid uuid,
        CONSTRAINT fk_roomid
            FOREIGN KEY(roomid)
            REFERENCES Rooms(id)
    )
  `;
}
