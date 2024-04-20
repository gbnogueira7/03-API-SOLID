import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  const user = await prisma.user.create({
    data: {
      name: 'john doe',
      email: 'john@rocketseat.com',
      password_hash: await hash('john123', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john@rocketseat.com',
    password: 'john123',
  })

  const { token } = authResponse.body

  return { token, user }
}
