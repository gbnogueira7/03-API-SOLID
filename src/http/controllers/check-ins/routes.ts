import { verifyJWT } from '@/http/middlewares/verify-JWT'
import { FastifyInstance } from 'fastify'
import { createCheckin } from './createCheckinsController'
import { validateCheckin } from './validateCheckinsController'
import { historyCheckin } from './historyCheckinsController'
import { metricsCheckin } from './metricsCheckinsController'
import { verifyUserRole } from '@/http/middlewares/verifyUserRole'

export async function checkinsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/checkins/history', historyCheckin)
  app.get('/checkins/metrics', metricsCheckin)

  app.post('/gyms/:gymId/checkins', createCheckin)

  app.patch(
    '/checkins/:checkinId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validateCheckin,
  )
}
