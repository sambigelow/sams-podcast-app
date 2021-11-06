import Fastify from "fastify"
import { PORT } from "./env.js"
import { prismaPlugin } from "./plugins/prismaPlugin.js"
import { registrationRoutes } from "./routes/registration.js"

const fastify = Fastify()

fastify.addContentTypeParser(
	"application/json",
	{ parseAs: "string" },
	function (req, body, done) {
		try {
			var json = JSON.parse(body)
			done(null, json)
		} catch (err) {
			err.statusCode = 400
			done(err, undefined)
		}
	}
)

fastify.register(prismaPlugin)

// Routes
fastify.register(registrationRoutes)

fastify.setErrorHandler(function (error, _request, reply) {
	console.log("Handling error...")
	console.log(error)
	reply.send(500)
})

async function startApp() {
	try {
		// CATCH ALL
		fastify.get("*", (req, reply) => {
			console.log("No matching route")
			console.log(req)
			reply.send(404)
		})

		await fastify.listen(PORT)
		console.log(`app listening on port ${PORT}`)
	} catch (e) {
		console.log(e)
	}
}

startApp()
