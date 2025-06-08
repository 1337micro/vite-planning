import postgres from 'postgres'
console.log(process.env.DB_PASS, `postgres://postgres:${process.env.DB_PASS}@localhost:5432/postgres`)
const sql = postgres({
  host                 : 'localhost',            // Postgres ip address[s] or domain name[s]
  port                 : 5432,          // Postgres server port[s]
  database             : 'postgres',            // Name of database to connect to
  username             : 'postgres',            // Username of database user
  password             : process.env.DB_PASS           // Password of database user
})

export default sql;