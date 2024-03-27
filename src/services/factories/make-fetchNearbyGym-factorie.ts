import { FetchNearbyGymService } from '../fetchNearbyGymsService'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma gyms-repository'

export function MakeFetchNearbyGymFactorie() {
  const gymRepository = new PrismaGymsRepository()
  const factorie = new FetchNearbyGymService(gymRepository)

  return factorie
}
