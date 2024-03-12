import { app } from "./app"
//npm i typescript @types/node tsx tsup -D
//npx tsc --init
//npm i fastify


app.listen({
  host: '0.0.0.0',
  port: 3333,
}).then(() => {
  console.log('server listening🚀')
})