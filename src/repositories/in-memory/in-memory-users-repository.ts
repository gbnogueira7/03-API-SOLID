import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryRepository implements UsersRepository {
  public items: User[] = []
  async findByEmail(email: string) {
    const users = this.items.find((item) => item.email === email)

    if (!users) {
      return null
    }

    return users
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }
    // push é um método designado a arrays, para implementar objetos ao array
    this.items.push(user)

    return user
  }
}
