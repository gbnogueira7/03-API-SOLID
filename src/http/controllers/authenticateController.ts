import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { InvalidCredentialsError } from '@/services/errors/invalid-credential-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-factorie'

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
    const { user } = await authenticateService.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )
    return reply.status(200).send({
      token,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
