import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { MakeSearchGymFactorie } from '@/services/factories/make-searchGyms-factorie'

export async function searchGym(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymQuerySchema.parse(request.query)

  const searchGymService = MakeSearchGymFactorie()
  const { gym } = await searchGymService.execute({
    query,
    page,
  })

  return reply.status(200).send({
    gym,
  })
}
