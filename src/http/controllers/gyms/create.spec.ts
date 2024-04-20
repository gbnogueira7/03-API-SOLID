import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/post/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'javascript gym description',
        latitude: -23.0260736,
        longitude: -43.4733056,
        phone: '21999999999',
        title: 'javascript gym',
      })

    expect(response.statusCode).toEqual(201)
  })
})
