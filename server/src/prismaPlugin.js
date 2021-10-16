import fp from 'fastify-plugin'
import prismaModule from '@prisma/client'

export const prismaPlugin = fp(async function (fastify) {
  const prisma = new prismaModule.PrismaClient()
  await prisma.$connect()

  // Make Prisma Client available through the fastify server instance: server.prisma
  fastify.decorate('prisma', prisma)
  
  fastify.addHook('onClose', async (fastify) => {
    await fastify.prisma.$disconnect()
  })
})
