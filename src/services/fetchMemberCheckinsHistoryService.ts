import { CheckIn } from '@prisma/client'
import { checkinsRepository } from '@/repositories/check-ins-repository'

interface FetchUserCheckinsHistoryServiceRequest {
  userId: string
  page: number
}
interface FetchUserCheckinsHistoryServiceResponse {
  checkIn: CheckIn[]
}

export class FetchUserCheckinsHistoryService {
  constructor(private checkinRepository: checkinsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckinsHistoryServiceRequest): Promise<FetchUserCheckinsHistoryServiceResponse> {
    const checkIn = await this.checkinRepository.findManyByUserId(userId, page)

    return { checkIn }
  }
}
