import { InMemoryGymRepository } from '@/repositories/in-memory/im-memory-gym-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsService } from './searchGyms'

let gymRepository: InMemoryGymRepository
let gymService: SearchGymsService

describe('Search gym Service', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    gymService = new SearchGymsService(gymRepository)
  })
  it('Should be able to search gym', async () => {
    await gymRepository.create({
      title: 'Javascript Gym',
      description: 'A place to learn javascript',
      phone: '123456789',
      latitude: -23.0260736,
      longitude: -43.4733056,
    })

    const { gym } = await gymService.execute({
      query: 'Javascript Gym',
      page: 1,
    })
    expect(gym).toHaveLength(1)
    expect(gym).toEqual([expect.objectContaining({ title: 'Javascript Gym' })])
  })
  it('Should be able to search paginated gym', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `Javascript Gym ${i}`,
        description: 'A place to learn javascript',
        phone: '123456789',
        latitude: -23.0260736,
        longitude: -43.4733056,
      })
    }
    const { gym } = await gymService.execute({
      query: 'Javascript',
      page: 2,
    })

    expect(gym).toHaveLength(2)
    expect(gym).toEqual([
      expect.objectContaining({ title: 'Javascript Gym 21' }),
      expect.objectContaining({ title: 'Javascript Gym 22' }),
    ])
  })
})
