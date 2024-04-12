import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { MakeFetchMemberCreckinFactorie } from '@/services/factories/make-fetchMember-factorie'

export async function historyCheckin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const historyCheckinQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = historyCheckinQuerySchema.parse(request.query)

  const fetchMemberCheckinsHistoryService = MakeFetchMemberCreckinFactorie()
  const { checkIn } = await fetchMemberCheckinsHistoryService.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIn,
  })
}
