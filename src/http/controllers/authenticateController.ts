import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { InvalidCredentialsError } from '@/services/errors/invalid-credential-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    // por algum motivo se eu chamar uma interface dentro de uma classe como parâmetro do meu constructor, se eu executar essa classe usando como parâmetp uma outra classe que implementa a interface, eu consigo executar um método que esta na classe que implementa a interface
    const authenticateService = makeAuthenticateService()
    await authenticateService.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }

  return reply.status(200).send()
}
