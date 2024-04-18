import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { MakeCreateGymFactorie } from '@/services/factories/make-createGym-factorie'

export async function createGym(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { description, latitude, longitude, phone, title } =
    createGymBodySchema.parse(request.body)

  const createGymService = MakeCreateGymFactorie()
  await createGymService.execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  })
  return reply.status(201).send()
}
