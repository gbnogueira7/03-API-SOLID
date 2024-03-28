import { FastifyInstance } from 'fastify'
import { register } from './controllers/registerController'
import { authenticate } from './controllers/authenticateController'
import { profile } from './controllers/profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users/create', register)
  app.post('/sessions', authenticate)

  // **Authenticated**
  app.get('/me', profile)
}
