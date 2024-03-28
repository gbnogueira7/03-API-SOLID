import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { MakeRegisterFactorie } from '@/services/factories/make-register-factorie'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    // por algum motivo se eu chamar uma interface dentro de uma classe como parâmetro do meu constructor, se eu executar essa classe usando como parâmetp uma outra classe que implementa a interface, eu consigo executar um método que esta na classe que implementa a interface
    const registerService = MakeRegisterFactorie()
    await registerService.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
