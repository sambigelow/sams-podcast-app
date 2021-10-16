import fastify from 'fastify'
import dotenv from 'dotenv'
import { prismaPlugin } from './prismaPlugin.js'
import bcrypt from 'bcrypt'

const { genSalt, hash } = bcrypt

dotenv.config()

const app = fastify()

app.register(prismaPlugin)

async function startApp() {
  const PORT = process.env.PORT

  try {
    app.post('/register', {}, async ({ body }) => {
      try {
        const { password, email } = JSON.parse(body)
        console.log({ body, password, email })

        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)

        const user = await app.prisma.user.create({
          data: {
            email,
            hashedPassword
          }
        })
        return user.id
      } catch (e) {
        console.error('Error creating user: ', e)
        throw new Error(e)
      }
    })

    // CATCH ALL
    app.get('*', (request) => {
      console.log('Failed to get!')
      console.log(request)
    })

    await app.listen(PORT)
    console.log(`app listening on port ${PORT}`)
  } catch (e) {
    console.log(e)
  }
}

startApp()
