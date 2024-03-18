import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

interface RegisterServiceResponse {
  user: User
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}
  // o método execute existe basicamente para quando formos usar a classe, darmos um execute com os dados vindos do body, e assim, obtêlos para usar dentro do service, e só executarmos o create após
  async execute({
    name,
    email,
    password,
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
    // note que chamamos a usersRepository, nela que executamos o create, que é a interface que está sendo implementada na classe que se conecta ao banco de dados
    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    })
    return { user }
  }
}
