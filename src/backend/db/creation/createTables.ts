import sql from "../db.js";

export async function createTables() {
  await createRoomTable();
  await createUserTable();
  await addRevealedColumnToRooms();
}

async function createRoomTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS Rooms (
        id uuid UNIQUE,
        userIds varchar(20)[],
        revealed boolean DEFAULT false
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

async function addRevealedColumnToRooms() {
  try {
    await sql`
      ALTER TABLE Rooms ADD COLUMN IF NOT EXISTS revealed boolean DEFAULT false
    `;
  } catch (error: unknown) {
    // Column might already exist or other issue, but we can continue
    console.log("Note: Could not add revealed column (might already exist):", (error as Error)?.message || error);
  }
}
