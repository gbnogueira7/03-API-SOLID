import { GetUserProfileService } from '../getUserProfileService'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-respository'

export function MakeGetUserProfileFactorie() {
  const usersRepository = new PrismaUsersRepository()
  const factorie = new GetUserProfileService(usersRepository)

  return factorie
}
