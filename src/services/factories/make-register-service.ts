import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-respository'
import { RegisterService } from '../registerUserService'

export function makeRegisterService() {
  const usersRepository = new PrismaUsersRepository()
  const registerService = new RegisterService(usersRepository)

  return registerService
}
