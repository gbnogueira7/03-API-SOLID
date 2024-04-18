import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { MakeCreateCreckinFactorie } from '@/services/factories/make-createCheckin-factorie'

export async function createCheckin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCheckinsParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckinBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = createCheckinBodySchema.parse(request.body)
  const { gymId } = createCheckinsParamsSchema.parse(request.params)

  const createCheckinService = MakeCreateCreckinFactorie()
  await createCheckinService.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
