import ERROR from '../errors'
import { validate } from './IntParam'

test('int validate numbers', () => {
  expect(validate(55)).toBeNull()
  expect(validate('1400')).toBeNull()
  expect(validate('699')).toBeNull()
  expect(validate('500.40')).toBeNull()
})

test('int validate non numbers', () => {
  expect(validate('abc')).toMatchObject({ error: ERROR.NOT_A_NUMBER, value: 'abc' })
  expect(validate('n700')).toMatchObject({ error: ERROR.NOT_A_NUMBER, value: 'n700' })
})
