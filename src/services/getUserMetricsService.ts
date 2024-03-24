import { checkinsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsServiceRequest {
  userId: string
}
interface GetUserMetricsServiceResponse {
  checkInCount: number
}

export class GetUserMetricsService {
  constructor(private checkinRepository: checkinsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsServiceRequest): Promise<GetUserMetricsServiceResponse> {
    const checkInCount = await this.checkinRepository.countByUserId(userId)

    return { checkInCount }
  }
}
