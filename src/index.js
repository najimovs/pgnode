import Fastify from "fastify"
import { query } from "./query.js"

const app = Fastify()

app.get( "/todos", async () => {

	return query( `select * from todos` )
} )

app.listen( { port: 3_000 } )


/*
	/books 10
	/books?page=1 10
	/books?page=2 10

	/books?page=1
	/books?page=1&category=2

	/books?page=2&category=2&count=5

	Auth
		id
		first_name
		last_name

	Book
		id
		name
		author(fullname)
		price
		cover_url
*/
