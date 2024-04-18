import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { MakeValidateCheckinFactorie } from '@/services/factories/make-validateGym-factorie'

export async function validateCheckin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  console.log('teste de consolo será?')

  const validateCheckinsParamsSchema = z.object({
    checkinId: z.string().uuid(),
  })
  console.log(`Requisição na url }`)

  const { checkinId } = validateCheckinsParamsSchema.parse(request.params)

  console.log(`Requisição na url `)

  const validateCheckinService = MakeValidateCheckinFactorie()
  await validateCheckinService.execute({
    checkInId: checkinId,
  })

  return reply.status(204).send()
}
