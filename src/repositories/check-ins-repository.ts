import { CheckIn, Prisma } from '@prisma/client'

export interface checkinsRepository {
  // CheckInUncheckedCreateInput é um tipo de objeto que o prisma cria, como o checkinCreateInput, porém o Unchecked é quem armazena os relacionamentos
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
