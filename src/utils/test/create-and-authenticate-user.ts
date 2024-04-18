import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'john doe',
    email: 'jondoe@rocketseat.com',
    password: 'john123',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'jondoe@rocketseat.com',
    password: 'john123',
  })

  const { token } = authResponse.body

  return { token }
}
