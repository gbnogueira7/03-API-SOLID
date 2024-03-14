import { expect, describe, it } from 'vitest'
import { RegisterService } from './registerUserService'
import { compare } from 'bcryptjs'

describe('Register Service', () => {
  it('Should hash user password upon registration', async () => {
    const registerService = new RegisterService({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerService.execute({
      name: 'john doe',
      email: 'john@rocketseat.com',
      password: '1234567',
    })

    const isPasswordCorrectlyHash = await compare('1234567', user.password_hash)
    expect(isPasswordCorrectlyHash).toBe(true)
  })
})
