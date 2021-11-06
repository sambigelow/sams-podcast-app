import fp from "fastify-plugin"
import { genSalt, hash } from "../esm/bcrypt.js"

async function registration(fastify) {
	fastify.post("/register", {}, async ({ body }) => {
		console.log({ body })
		const { email, password } = body
		const salt = await genSalt(10)
		const hashedPassword = await hash(password, salt)

		try {
			const user = await fastify.prisma.user.create({
				data: {
					email,
					hashedPassword
				}
			})
			return user.id
		} catch (e) {
			console.log(e)
			throw new Error(e)
		}
	})
}

export const registrationRoutes = fp(registration)
