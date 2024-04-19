import { FastifyInstance } from 'fastify'
import { register } from './registerController'
import { authenticate } from './authenticateController'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-JWT'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)
  // **Authenticated**
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
