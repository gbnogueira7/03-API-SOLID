import { app } from './app'
import { env } from './env/index'
// npm i prisma -D
// npx prisma init
// npx prisma generate (após criar o model)
// npm i @prisma/client
app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP server listening🚀')
  })
