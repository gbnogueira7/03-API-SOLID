import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { FetchUserCheckinsHistoryService } from '../fetchMemberCheckinsHistoryService'

export function MakeFetchMemberCreckinFactorie() {
  const checkinRepository = new PrismaCheckinsRepository()
  const factorie = new FetchUserCheckinsHistoryService(checkinRepository)

  return factorie
}
