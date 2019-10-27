import ERROR from '../errors'
import { validate } from './IntParam'

test('float validate numbers', () => {
  expect(validate(20.43)).toBeNull()
  expect(validate('1400.53')).toBeNull()
  expect(validate('699.999')).toBeNull()
  expect(validate('500.123131')).toBeNull()
  expect(validate('-1111')).toBeNull()
})

test('float validate non numbers', () => {
  expect(validate('fdfas')).toMatchObject({ error: ERROR.NOT_A_NUMBER, value: 'fdfas' })
  expect(validate('a111231')).toMatchObject({ error: ERROR.NOT_A_NUMBER, value: 'a111231' })
})
