import { ResourceNotFoundError } from './errors/resource-not-found'
import { Gym } from '@prisma/client'
import { GymRepository } from '@/repositories/gym-repository'

interface FetchNearbyGymServiceRequest {
  userLatitude: number
  userLongitude: number
}
interface FetchNearbyGymServiceResponse {
  gym: Gym[]
}

export class FetchNearbyGymService {
  constructor(private gymRepository: GymRepository) {}
  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymServiceRequest): Promise<FetchNearbyGymServiceResponse> {
    const gym = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    return { gym }
  }
}
