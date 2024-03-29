import { CheckIn, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { checkinsRepository } from '../check-ins-repository'
import dayjs from 'dayjs'

export class InMemoryCheckinRepository implements checkinsRepository {
  public items: CheckIn[] = []

  async save(checkIn: CheckIn) {
    const checkInIndex = await this.items.findIndex(
      (item) => item.id === checkIn.id,
    )

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }

  async findById(id: string) {
    const checkIn = this.items.find((item) => item.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async countByUserId(userId: string) {
    return this.items.filter((items) => items.user_id === userId).length
  }

  async findManyByUserId(UserId: string, page: number) {
    return this.items
      .filter((item) => item.user_id === UserId)
      .slice((page - 1) * 20, page * 20)
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })
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
