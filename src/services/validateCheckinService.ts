import { CheckIn } from '@prisma/client'
import { checkinsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

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

    checkIn.validated_at = new Date()

    await this.checkinRepository.save(checkIn)

    return { checkIn }
  }
}
