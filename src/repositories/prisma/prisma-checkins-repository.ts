import { CheckIn, Prisma } from '@prisma/client'
import { checkinsRepository } from '../check-ins-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckinsRepository implements checkinsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkin = await prisma.checkIn.create({
      data,
    })
    return checkin
  }

  async findManyByUserId(userId: string, page: number) {
    const checkins = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      skip: (page - 1) * 20,
      take: 20,
    })
    return checkins
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOftheDay = dayjs(date).startOf('date')
    const endOftheDay = dayjs(date).endOf('date')

    const checkin = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOftheDay.toDate(),
          lte: endOftheDay.toDate(),
        },
      },
    })

    return checkin
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })
    return count
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })
    return checkIn
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })
    return checkIn
  }
}
