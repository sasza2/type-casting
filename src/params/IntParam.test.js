import ERROR from '../errors'
import IntParam, { validate } from './IntParam'

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

test('int cast', () => {
  const number = IntParam()
  expect(number.cast(555.44)).toEqual(555)
  expect(number.cast(-3.44)).toEqual(-3)
  expect(number.cast('15')).toEqual(15)
  expect(number.cast('abc')).toEqual(0)
  expect(number.cast()).toBeNull()
})

test('int cast required', () => {
  const number = IntParam.options({ required: true })
  expect(number.cast()).toEqual(0)
  expect(number.cast(0)).toEqual(0)
  expect(number.cast(144)).toEqual(144)
})
