import { CheckinService } from './checkinService'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { InMemoryGymRepository } from '@/repositories/in-memory/im-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkinsRepository: InMemoryCheckinRepository
let gymRepository: InMemoryGymRepository
let checkinService: CheckinService

describe('Register Service', () => {
  beforeEach(() => {
    // cria instâncias
    checkinsRepository = new InMemoryCheckinRepository()
    gymRepository = new InMemoryGymRepository()
    checkinService = new CheckinService(checkinsRepository, gymRepository)

    vi.useFakeTimers()

    gymRepository.items.push({
      id: 'gym-01',
      title: '',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able create check-in', async () => {
    const { checkIn } = await checkinService.execute({
      userId: '1',
      gymId: 'gym-01',
      userAltitude: 0,
      userLongitude: 0,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('Should not be able check-in twice un unique day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkinService.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userAltitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      checkinService.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userAltitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
  // Para realização da função acima e abaixo estamos usando o método TDD, que consistem em criar testes para que os problemas no qual estamos sejam resolvidos, essa metodologia diz que temos 3 fases "red", 'green' e "refactor", note que o problema acima foi solucionado no ponto que estamos, mas foi gerado outro problema, o qual corresponde com o teste abaixo, pois nosso objetivo foi sair do "red", erro no teste, para o green, teste passando, agora iremos para o refactor, no qual iremos aprimorar nosso código,
  it('Should be able check-in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkinService.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userAltitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await checkinService.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userAltitude: 0,
      userLongitude: 0,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
})
