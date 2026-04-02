import { Client } from "pg"
import Fastify from "fastify"

const app = Fastify()

const PG_USER = process.env.PG_USER
const PG_PASSWORD = process.env.PG_PASSWORD
const PG_HOST = process.env.PG_HOST
const PG_PORT = process.env.PG_PORT
const PG_DBNAME = process.env.PG_DBNAME

const client = new Client( {

	user: PG_USER,
	password: PG_PASSWORD,
	host: PG_HOST,
	port: PG_PORT,
	database: PG_DBNAME,
} )

await client.connect()

const todos_per_page = 3

app.get( "/todos/:page", async ( req, res ) => {

	const offset = ( req.params.page - 1 ) * todos_per_page

	const sql = `
		select *
		from todos
		offset $1 limit $2
	`

	const result = await client.query( sql, [ offset, todos_per_page ] )

	return result.rows
} )

app.get( "/users/:id", async ( req, res ) => {

	const sql = `
		select *
		from users
		where id = $1
	`

	const result = await client.query( sql, [ req.params.id ] )

	return result.rows
} )

app.listen( { port: 3_000 } )
