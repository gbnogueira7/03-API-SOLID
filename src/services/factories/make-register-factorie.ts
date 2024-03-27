import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-respository'
import { RegisterService } from '../registerUserService'

export function MakeRegisterFactorie() {
  const usersRepository = new PrismaUsersRepository()
  const factorie = new RegisterService(usersRepository)

  return factorie
}
