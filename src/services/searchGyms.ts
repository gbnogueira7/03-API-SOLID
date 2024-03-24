import { ResourceNotFoundError } from './errors/resource-not-found'
import { Gym } from '@prisma/client'
import { GymRepository } from '@/repositories/gym-repository'

interface SearchGymsServiceRequest {
  query: string
  page: number
}
interface SearchGymsServiceResponse {
  gym: Gym[]
}

export class SearchGymsService {
  constructor(private gymRepository: GymRepository) {}
  async execute({
    query,
    page,
  }: SearchGymsServiceRequest): Promise<SearchGymsServiceResponse> {
    const gym = await this.gymRepository.searchMany(query, page)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    return { gym }
  }
}
