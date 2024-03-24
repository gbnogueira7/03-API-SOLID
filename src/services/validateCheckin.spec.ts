import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { ValidateCheckinService } from './validateCheckinService'
import { ResourceNotFoundError } from './errors/resource-not-found'

let checkinsRepository: InMemoryCheckinRepository
let validateCheckinService: ValidateCheckinService

describe('Validate check-in service', () => {
  beforeEach(async () => {
    // cria instâncias
    checkinsRepository = new InMemoryCheckinRepository()
    validateCheckinService = new ValidateCheckinService(checkinsRepository)

    // vi.useFakeTimers()
  })
  afterEach(() => {
    //  vi.useRealTimers()
  })

  it('Should be able to validate the check-in', async () => {
    const createdCheckIn = await checkinsRepository.create({
      gym_id: '01',
      user_id: '01',
    })

    const { checkIn } = await validateCheckinService.execute({
      checkInId: createdCheckIn.id,
    })
    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkinsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })
  it('Shoud be not to be able to validate an inexistent check-in', async () => {
    expect(() =>
      validateCheckinService.execute({
        checkInId: 'inexistent-checkin-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
