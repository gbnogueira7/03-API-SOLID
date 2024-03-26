import { CheckIn } from '@prisma/client'
import { checkinsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import dayjs from 'dayjs'
import { LateCheckinValidationError } from './errors/lateCheckinValidateError'

interface ValidateCheckinServiceRequest {
  checkInId: string
}
interface ValidateCheckinServiceResponse {
  checkIn: CheckIn
}

export class ValidateCheckinService {
  constructor(private checkinRepository: checkinsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckinServiceRequest): Promise<ValidateCheckinServiceResponse> {
    const checkIn = await this.checkinRepository.findById(checkInId)
    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckinCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckinCreation > 20) {
      throw new LateCheckinValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkinRepository.save(checkIn)

    return { checkIn }
  }
}
