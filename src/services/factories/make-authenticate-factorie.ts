import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-respository'
import { AuthenticateService } from '../authenticateService'

export function makeAuthenticateService() {
  const usersRepository = new PrismaUsersRepository()
  const factorie = new AuthenticateService(usersRepository)

  return factorie
}
