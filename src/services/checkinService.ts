import { CheckIn } from '@prisma/client'
import { checkinsRepository } from '@/repositories/check-ins-repository'
import { GymRepository } from '@/repositories/gym-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface CheckinServiceRequest {
  userId: string
  gymId: string
  userAltitude: number
  userLongitude: number
}
interface CheckinServiceResponse {
  checkIn: CheckIn
}

export class CheckinService {
  constructor(
    private checkinRepository: checkinsRepository,
    private gymRepository: GymRepository,
  ) {}

  async execute({
    userId,
    gymId,
  }: CheckinServiceRequest): Promise<CheckinServiceResponse> {
    const gym = await this.gymRepository.findById(gymId)
    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const checkInOnSameDay = await this.checkinRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )
    if (checkInOnSameDay) {
      throw new Error('Check-in already exists')
    }

    const checkIn = await this.checkinRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}
