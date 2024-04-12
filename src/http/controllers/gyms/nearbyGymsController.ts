import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { MakeFetchNearbyGymFactorie } from '@/services/factories/make-fetchNearbyGym-factorie'

export async function nearbyGym(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymQuerySchema.parse(request.query)

  const fetchNearbyGyms = MakeFetchNearbyGymFactorie()
  const { gym } = await fetchNearbyGyms.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gym,
  })
}
