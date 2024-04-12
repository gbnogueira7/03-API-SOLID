import { FastifyRequest, FastifyReply } from 'fastify'
import { MakeGetUserMetricsFactorie } from '@/services/factories/make-getUsersMetrics-factorie'

export async function metricsCheckin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUsersMetrics = MakeGetUserMetricsFactorie()
  const { checkInCount } = await getUsersMetrics.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkInCount,
  })
}
