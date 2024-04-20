import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token(e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh token2', async () => {
    await request(app.server).post('/users').send({
      name: 'john doe',
      email: 'jondoe@rocketseat.com',
      password: 'john123',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'jondoe@rocketseat.com',
      password: 'john123',
    })

    const cookies = authResponse.get('Set-Cookie')

    if (cookies === undefined) {
      throw new Error('Set-Cookie not found')
    }

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
