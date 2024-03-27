import { CheckIn } from '@prisma/client'
import { checkinsRepository } from '@/repositories/check-ins-repository'
import { GymRepository } from '@/repositories/gym-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { getDistanceBetweenCoordinates } from '@/utils/getDistanceByCoordenates'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberCheckinsError } from './errors/max-number-checkins'

interface CheckinServiceRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}
interface CheckinServiceResponse {
  checkIn: CheckIn
}

export class CreateCheckinService {
  constructor(
    private checkinRepository: checkinsRepository,
    private gymRepository: GymRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckinServiceRequest): Promise<CheckinServiceResponse> {
    const gym = await this.gymRepository.findById(gymId)
    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const maxDistanceInKilometers = 0.1

    if (distance > maxDistanceInKilometers) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkinRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )
    if (checkInOnSameDay) {
      throw new MaxNumberCheckinsError()
    }

    const checkIn = await this.checkinRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}
