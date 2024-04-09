import { ResourceNotFoundError } from './errors/resource-not-found'
import { Gym } from '@prisma/client'
import { GymRepository } from '@/repositories/gym-repository'

interface searchGymServiceRequest {
  query: string
  page: number
}
interface searchGymServiceResponse {
  gym: Gym[]
}

export class SearchGymService {
  constructor(private gymRepository: GymRepository) {}
  async execute({
    query,
    page,
  }: searchGymServiceRequest): Promise<searchGymServiceResponse> {
    const gym = await this.gymRepository.searchMany(query, page)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    return { gym }
  }
}
