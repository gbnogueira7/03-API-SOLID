import { CheckIn } from '@prisma/client'
import { checkinsRepository } from '@/repositories/check-ins-repository'

interface CheckinServiceRequest {
  userId: string
  gymId: string
}
interface CheckinServiceResponse {
  checkIn: CheckIn
}

export class CheckinService {
  constructor(private checkinRepository: checkinsRepository) {}
  async execute({
    userId,
    gymId,
  }: CheckinServiceRequest): Promise<CheckinServiceResponse> {
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
