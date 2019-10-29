import ERROR from '../errors'
import FloatParam, { validate } from './FloatParam'

test('float validate numbers', () => {
  expect(validate(20.43)).toBeNull()
  expect(validate('1400.53')).toBeNull()
  expect(validate('699.999')).toBeNull()
  expect(validate('500.123131')).toBeNull()
  expect(validate('-1111')).toBeNull()
})

test('float validate non numbers', () => {
  expect(validate('fdfas')).toMatchObject({ error: ERROR.NOT_A_NUMBER })
  expect(validate('a111231')).toMatchObject({ error: ERROR.NOT_A_NUMBER })
})

test('float validate required empty', () => {
  const number = FloatParam.options({ required: true })
  expect(number.validate(441.1)).toBeNull()
  expect(number.validate('15.41')).toBeNull()
  expect(number.validate()).toMatchObject({ error: ERROR.REQUIRED_BUT_EMPTY })
})
