import { expect, describe, it } from 'vitest'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './athenticateService'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credential-error'

describe('Register Service', () => {
  it('Should be able authenticate', async () => {
    const inMemoryUsersRepository = new InMemoryRepository()

    const authenticateService = new AuthenticateService(inMemoryUsersRepository)

    inMemoryUsersRepository.create({
      name: 'john',
      email: 'john@rocketseat.com',
      password_hash: await hash('1234567', 6),
    })

    const { user } = await authenticateService.execute({
      email: 'john@rocketseat.com',
      password: '1234567',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should be not able to authenticate with wrong e-mail', async () => {
    const inMemoryUsersRepository = new InMemoryRepository()

    const authenticateService = new AuthenticateService(inMemoryUsersRepository)

    expect(() =>
      authenticateService.execute({
        email: 'john@rocketseat123.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able authenticate with wrong password', async () => {
    const inMemoryUsersRepository = new InMemoryRepository()

    const authenticateService = new AuthenticateService(inMemoryUsersRepository)

    inMemoryUsersRepository.create({
      name: 'john',
      email: 'john@rocketseat.com',
      password_hash: await hash('1234567', 6),
    })

    expect(() =>
      authenticateService.execute({
        email: 'john@rocketseat.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
