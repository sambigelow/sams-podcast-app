import fastify from 'fastify'
import fastifyCors from 'fastify-cors'

const PORT = 4000

const app = fastify()

app.register(fastifyCors, {
  origin: 'http://localhost:3000'
})


async function startApp() {
  try {
    app.post('/register', {}, (request, reply) => {
      console.log(request)
    })

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
