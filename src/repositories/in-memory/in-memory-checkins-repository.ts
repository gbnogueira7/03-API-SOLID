import { CheckIn, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { checkinsRepository } from '../check-ins-repository'

export class InMemoryCheckinRepository implements checkinsRepository {
  public items: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkOnSameDate = this.items.find(
      (checkIn) => checkIn.user_id === userId,
    )
    if (!checkOnSameDate) {
      return null
    }
    return checkOnSameDate
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }
    // push é um método designado a arrays, para implementar objetos ao array
    this.items.push(checkIn)

    return checkIn
  }
}
