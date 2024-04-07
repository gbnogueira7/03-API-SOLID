import { FastifyInstance } from 'fastify'
import { register } from './registerController'
import { authenticate } from './authenticateController'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-JWT'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  // **Authenticated**
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
