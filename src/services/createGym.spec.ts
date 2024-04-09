import { InMemoryGymRepository } from '@/repositories/in-memory/im-memory-gym-repository'
import { CreateGymService } from './createGymService'
import { beforeEach, describe, expect, it } from 'vitest'

let gymRepository: InMemoryGymRepository
let gymService: CreateGymService

describe('Gym Service', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    gymService = new CreateGymService(gymRepository)
  })
  it('Should be able to create gym', async () => {
    const { gym } = await gymService.execute({
      title: 'Javascript Gym',
      description: 'A place to learn javascript',
      phone: '123456789',
      latitude: -23.0260736,
      longitude: -43.4733056,
    })
    expect(gym.id).toEqual(expect.any(String))
  })
})
