import { PrismaGymsRepository } from '@/repositories/prisma/prisma gyms-repository'
import { CreateGymService } from '../createGymService'

export function MakeCreateGymFactorie() {
  const gymRepository = new PrismaGymsRepository()
  const factorie = new CreateGymService(gymRepository)

  return factorie
}
