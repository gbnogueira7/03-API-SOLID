import { FastifyInstance } from 'fastify'
import { register } from './controllers/registerController'
import { authenticate } from './controllers/authenticateController'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users/create', register)
  app.post('/sessions', authenticate)
}
