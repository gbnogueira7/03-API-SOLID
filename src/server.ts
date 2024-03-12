import { app } from "./app"
import {env} from "./env/index"
//npm i dotenv
//npm i zod

app.listen({
  host: '0.0.0.0',
  port: env.PORT,
}).then(() => {
  console.log('server listening🚀')
})