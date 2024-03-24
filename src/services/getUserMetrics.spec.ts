import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { GetUserMetricsService } from './getUserMetricsService'

let checkinsRepository: InMemoryCheckinRepository
let getUserMetricsService: GetUserMetricsService

describe('Get Users Metrics Service', () => {
  beforeEach(async () => {
    // cria instâncias
    checkinsRepository = new InMemoryCheckinRepository()
    getUserMetricsService = new GetUserMetricsService(checkinsRepository)
  })

  it('Should be able to count checkins by user', async () => {
    await checkinsRepository.create({
      gym_id: 'gym01',
      user_id: 'user01',
    })

    const { checkInCount } = await getUserMetricsService.execute({
      userId: 'user01',
    })
    expect(checkInCount).toEqual(1)
  })
})
