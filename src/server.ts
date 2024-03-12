import { app } from './app'
import { env } from './env/index'
// npm i eslint @rocketseat/eslint-config -D

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP server listening🚀')
  })
