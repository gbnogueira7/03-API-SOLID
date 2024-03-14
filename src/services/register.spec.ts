import { expect, describe, it } from 'vitest'
import { RegisterService } from './registerUserService'
import { compare } from 'bcryptjs'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Service', () => {
  it('Should hash user password upon registration', async () => {
    const inMemoryUsersRepository = new InMemoryRepository()

    const registerService = new RegisterService(inMemoryUsersRepository)

    const { user } = await registerService.execute({
      name: 'john doe',
      email: 'john@rocketseat.com',
      password: '1234567',
    })

    const isPasswordCorrectlyHash = await compare('1234567', user.password_hash)
    expect(isPasswordCorrectlyHash).toBe(true)
  })

  it('Should hash user password upon registration', async () => {
    const inMemoryUsersRepository = new InMemoryRepository()

    const registerService = new RegisterService(inMemoryUsersRepository)

    const { user } = await registerService.execute({
      name: 'john doe',
      email: 'john@rocketseat.com',
      password: '1234567',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able register users with same e-mail twice', async () => {
    const inMemoryUsersRepository = new InMemoryRepository()

    const email = 'john@rocketseat.com'

    const registerService = new RegisterService(inMemoryUsersRepository)

    await registerService.execute({
      name: 'john doe',
      email,
      password: '1234567',
    })

    expect(() =>
      registerService.execute({
        name: 'john doe',
        email,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
