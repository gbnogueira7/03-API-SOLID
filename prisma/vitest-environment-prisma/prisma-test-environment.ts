import { Environment } from 'vitest'
// sudo npm link dentro da pasta vitest-environment-prisma
export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    console.log('Setup')

    return {
      async teardown() {
        console.log('Setteardownup')
      },
    }
  },
}
