import { PrismaGymsRepository } from '@/repositories/prisma/prisma gyms-repository'
import { CreateCheckinService } from '../createCheckinService'
import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-checkins-repository'

export function MakeCreateCreckinFactorie() {
  const checkinRepository = new PrismaCheckinsRepository()
  const gymRepository = new PrismaGymsRepository()
  const factorie = new CreateCheckinService(checkinRepository, gymRepository)

  return factorie
}
