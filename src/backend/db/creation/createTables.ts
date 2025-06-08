import sql from '../db.js'

export async function createTables() {
    return await createRoomTable();
}

async function createRoomTable() {
    await sql`
    CREATE TABLE IF NOT EXISTS Room (
        id uuid,
        userIds varchar(20)[]
    )
  `
}