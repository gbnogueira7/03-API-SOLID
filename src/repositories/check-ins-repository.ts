import { CheckIn, Prisma } from '@prisma/client'

export interface checkinsRepository {
  // CheckInUncheckedCreateInput é um tipo de objeto que o prisma cria, como o checkinCreateInput, porém o Unchecked é quem armazena os relacionamentos
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findManyByUserId(UserId: string, page: number): Promise<CheckIn[]>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  countByUserId(userId: string): Promise<number>
  findById(checkInId: string): Promise<CheckIn | null>
  save(CheckIn: CheckIn): Promise<CheckIn>
}
