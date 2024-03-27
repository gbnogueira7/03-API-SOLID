import { ValidateCheckinService } from '../validateCheckinService'
import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-checkins-repository'

export function MakeValidateCheckinFactorie() {
  const checkinsRepository = new PrismaCheckinsRepository()
  const factorie = new ValidateCheckinService(checkinsRepository)

  return factorie
}
