import { expect, test } from 'vitest'

test('ok', () => {
  console.log(process.env.DATABASE_URL)

  expect(1).toBe(1)
})
