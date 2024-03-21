import { CheckinService } from '../checkinService'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-checkins-repository'

let checkinsRepository: InMemoryCheckinRepository
let checkinService: CheckinService

describe('Register Service', () => {
  beforeEach(() => {
    // cria instâncias
    checkinsRepository = new InMemoryCheckinRepository()
    checkinService = new CheckinService(checkinsRepository)
  })
  it('Should be able create check-in', async () => {
    const { checkIn } = await checkinService.execute({
      userId: '1',
      gymId: '1',
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
})
