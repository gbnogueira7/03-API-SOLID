import { CheckinService } from './checkinService'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { InMemoryGymRepository } from '@/repositories/in-memory/im-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberCheckinsError } from './errors/max-number-checkins'
import { MaxDistanceError } from './errors/max-distance-error'

let checkinsRepository: InMemoryCheckinRepository
let gymRepository: InMemoryGymRepository
let checkinService: CheckinService

describe('Register Service', () => {
  beforeEach(async () => {
    // cria instâncias
    checkinsRepository = new InMemoryCheckinRepository()
    gymRepository = new InMemoryGymRepository()
    checkinService = new CheckinService(checkinsRepository, gymRepository)

    vi.useFakeTimers()

    await gymRepository.create({
      id: 'gym-01',
      title: '',
      description: '',
      phone: '',
      latitude: -23.0260736,
      longitude: -43.4733056,
    })
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able create check-in', async () => {
    const { checkIn } = await checkinService.execute({
      userId: '1',
      gymId: 'gym-01',
      userLatitude: -23.0260736,
      userLongitude: -43.4733056,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('Should not be able check-in twice un unique day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkinService.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -23.0260736,
      userLongitude: -43.4733056,
    })

    await expect(() =>
      checkinService.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -23.0260736,
        userLongitude: -43.4733056,
      }),
    ).rejects.toBeInstanceOf(MaxNumberCheckinsError)
  })
  // Para realização da função acima e abaixo estamos usando o método TDD, que consistem em criar testes para que os problemas no qual estamos sejam resolvidos, essa metodologia diz que temos 3 fases "red", 'green' e "refactor", note que o problema acima foi solucionado no ponto que estamos, mas foi gerado outro problema, o qual corresponde com o teste abaixo, pois nosso objetivo foi sair do "red", erro no teste, para o green, teste passando, agora iremos para o refactor, no qual iremos aprimorar nosso código,
  it('Should be able check-in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkinService.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -23.0260736,
      userLongitude: -43.4733056,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await checkinService.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -23.0260736,
      userLongitude: -43.4733056,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able create check-in on distant gym', async () => {
    gymRepository.items.push({
      id: 'gym-02',
      title: '',
      description: '',
      phone: '',
      latitude: new Decimal(-22.95555),
      longitude: new Decimal(-43.3886769),
    })

    expect(() =>
      checkinService.execute({
        userId: '1',
        gymId: 'gym-02',
        userLatitude: -23.0260736,
        userLongitude: -43.4733056,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
