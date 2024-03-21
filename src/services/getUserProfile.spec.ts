import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { GetUserProfileService } from './getUserProfileService'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found'

let usersRepository: InMemoryUsersRepository
let getUserProfileService: GetUserProfileService

describe('find by user id Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    getUserProfileService = new GetUserProfileService(usersRepository)
  })

  it('should be able get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'john doe',
      email: 'john@rocketseat.com',
      password_hash: await hash('1234567', 6),
    })

    const { user } = await getUserProfileService.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able get profile with wrong id', async () => {
    await expect(() =>
      getUserProfileService.execute({
        userId: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
