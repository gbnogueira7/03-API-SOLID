import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { GetUserMetricsService } from '../getUserMetricsService'

export function MakeGetUserMetricsFactorie() {
  const checkinRepository = new PrismaCheckinsRepository()
  const factorie = new GetUserMetricsService(checkinRepository)

  return factorie
}
