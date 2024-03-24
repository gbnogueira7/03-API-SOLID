import { InMemoryGymRepository } from '@/repositories/in-memory/im-memory-gym-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymService } from './fetchNearbyGymsService'

let gymRepository: InMemoryGymRepository
let gymService: FetchNearbyGymService

describe('Gym Service', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    gymService = new FetchNearbyGymService(gymRepository)
  })
  it('Should be able to find gym lesser 10km distance', async () => {
    await gymRepository.create({
      title: 'Near Gym',
      description: 'A place to learn javascript',
      phone: '123456789',
      latitude: -22.9983522,
      longitude: -43.4283421,
    })
    await gymRepository.create({
      title: 'Far Gym',
      description: 'A place to learn javascript',
      phone: '123456789',
      latitude: -7.8619617,
      longitude: -35.9613177,
    })

    const { gym } = await gymService.execute({
      userLatitude: -22.9983522,
      userLongitude: -43.4283421,
    })
    expect(gym).toHaveLength(1)
    expect(gym).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
