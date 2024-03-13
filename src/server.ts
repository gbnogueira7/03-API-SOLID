import { app } from './app'
import { env } from './env/index'

// npm i bcryptjs
//npm i -D @types/bcryptjs

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP server listening🚀')
  })
