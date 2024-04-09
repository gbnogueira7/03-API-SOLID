import { PrismaGymsRepository } from '@/repositories/prisma/prisma gyms-repository'
import { SearchGymService } from '../searchGymsService'

export function MakeSearchGymFactorie() {
  const gymRepository = new PrismaGymsRepository()
  const factorie = new SearchGymService(gymRepository)

  return factorie
}
