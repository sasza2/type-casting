import ERROR from '../errors'
import FloatType, { validate } from './FloatType'

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
  const number = FloatType.options({ required: true })
  expect(number.validate(441.1)).toBeNull()
  expect(number.validate('15.41')).toBeNull()
  expect(number.validate()).toMatchObject({ error: ERROR.REQUIRED_BUT_EMPTY })
})

test('float cast', () => {
  const number = FloatType()
  expect(number.cast(555.44)).toEqual(555.44)
  expect(number.cast(-3.44)).toEqual(-3.44)
  expect(number.cast('15')).toEqual(15)
  expect(number.cast('abc')).toEqual(0)
  expect(number.cast()).toBeNull()
})

test('float cast required', () => {
  const number = FloatType.options({ required: true })
  expect(number.cast()).toEqual(0)
  expect(number.cast(0)).toEqual(0)
  expect(number.cast(144)).toEqual(144)
})
