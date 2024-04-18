import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('find nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find nearby gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/post/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'javascript gym description',
        latitude: -27.0610928,
        longitude: -49.5229501,
        phone: '21999999999',
        title: 'javascript gym',
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
