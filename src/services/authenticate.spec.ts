import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credential-error'
import { AuthenticateService } from './authenticateService'

// Aqui eu estou tipando minhas variáveis com classes, o que faz com que quando os its rodarem, antes irá criar uma instância da qual essas variáveis derivam, o que faz com que elas rodem os métodos que atribuem automáticamente

let usersRepository: InMemoryUsersRepository
let authenticateService: AuthenticateService

describe('Register Service', () => {
  beforeEach(() => {
    // cria instâncias
    usersRepository = new InMemoryUsersRepository()
    authenticateService = new AuthenticateService(usersRepository)
  })
  it('Should be able authenticate', async () => {
    usersRepository.create({
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
    await expect(() =>
      authenticateService.execute({
        email: 'john@rocketseat123.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able authenticate with wrong password', async () => {
    usersRepository.create({
      name: 'john',
      email: 'john@rocketseat.com',
      password_hash: await hash('1234567', 6),
    })

    await expect(() =>
      authenticateService.execute({
        email: 'john@rocketseat.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
