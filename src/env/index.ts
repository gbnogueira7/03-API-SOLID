import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  // DATABASE_URL: z.string(),
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('invalid environment variables🚨', _env.error.format())
  throw new Error('invalid environment variables🚨')
}

export const env = _env.data
