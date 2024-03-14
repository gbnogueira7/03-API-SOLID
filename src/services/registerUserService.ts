import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

//para executar o -D do SOLID( Inversão de dependências) transformamos nosso register service em uma classe para
//não precisar chamar o prisma aqui dentro, para que toda a conexão com o db fique exclusivamente com o repository 
export class RegisterService {
  constructor(private usersRepository: any) {}
  async execute({ name, email, password }: RegisterServiceRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('e-mail already exists')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
