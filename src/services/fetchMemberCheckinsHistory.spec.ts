import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { FetchUserCheckinsHistoryService } from './fetchMemberCheckinsHistoryService'

let checkinsRepository: InMemoryCheckinRepository
let fetchCheckinsRepository: FetchUserCheckinsHistoryService

describe('Fetch User Check-in History Service', () => {
  beforeEach(async () => {
    // cria instâncias
    checkinsRepository = new InMemoryCheckinRepository()
    fetchCheckinsRepository = new FetchUserCheckinsHistoryService(
      checkinsRepository,
    )
  })

  it('Should be able to fetch check-in history', async () => {
    await checkinsRepository.create({
      gym_id: 'gym01',
      user_id: 'user01',
    })

    const { checkIn } = await fetchCheckinsRepository.execute({
      userId: 'user01',
      page: 1,
    })
    expect(checkIn).toHaveLength(1)
    expect(checkIn).toEqual([expect.objectContaining({ gym_id: 'gym01' })])
  })

  it('Should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkinsRepository.create({
        gym_id: `gym${i}`,
        user_id: 'user01',
      })
    }

    const { checkIn } = await fetchCheckinsRepository.execute({
      userId: 'user01',
      page: 2,
    })
    expect(checkIn).toHaveLength(2)
    expect(checkIn).toEqual([
      expect.objectContaining({ gym_id: 'gym21' }),
      expect.objectContaining({ gym_id: 'gym22' }),
    ])

  })
})
