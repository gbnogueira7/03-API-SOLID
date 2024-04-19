import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { MakeValidateCheckinFactorie } from '@/services/factories/make-validateGym-factorie'

export async function validateCheckin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const validateCheckinsParamsSchema = z.object({
    checkinId: z.string().uuid(),
  })

  const { checkinId } = validateCheckinsParamsSchema.parse(request.params)

  const validateCheckinService = MakeValidateCheckinFactorie()
  await validateCheckinService.execute({
    checkInId: checkinId,
  })

  return reply.status(204).send()
}
