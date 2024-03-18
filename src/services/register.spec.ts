import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterService } from './registerUserService'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let registerService: RegisterService

describe('Register Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerService = new RegisterService(usersRepository)
  })
  it('Should hash user password upon registration', async () => {
    const { user } = await registerService.execute({
      name: 'john doe',
      email: 'john@rocketseat.com',
      password: '1234567',
    })

    const isPasswordCorrectlyHash = await compare('1234567', user.password_hash)
    expect(isPasswordCorrectlyHash).toBe(true)
  })

  it('Should hash user password upon registration', async () => {
    const { user } = await registerService.execute({
      name: 'john doe',
      email: 'john@rocketseat.com',
      password: '1234567',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able register users with same e-mail twice', async () => {
    const email = 'john@rocketseat.com'

    await registerService.execute({
      name: 'john doe',
      email,
      password: '1234567',
    })

    await expect(() =>
      registerService.execute({
        name: 'john doe',
        email,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
