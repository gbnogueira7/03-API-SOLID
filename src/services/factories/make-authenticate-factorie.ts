import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-respository'
import { AuthenticateService } from '../athenticateService'

export function makeAuthenticateService() {
  const usersRepository = new PrismaUsersRepository()
  const factorie = new AuthenticateService(usersRepository)

  return factorie
}
