import ERROR from '../errors'
import StringParam, { validate } from './StringParam'

test('string validate', () => {
  expect(validate(55)).toBeNull()
  expect(validate('1400')).toBeNull()
  expect(validate('699')).toBeNull()
  expect(validate('500.40')).toBeNull()
})

test('string validate empty', () => {
  expect(validate()).toMatchObject({ error: ERROR.IS_EMPTY })
  expect(validate(null)).toMatchObject({ error: ERROR.IS_EMPTY })
  expect(validate(undefined)).toMatchObject({ error: ERROR.IS_EMPTY })
})

test('string cast', () => {
  const str = StringParam()
  expect(str.cast('555.44')).toEqual('555.44')
  expect(str.cast(-3.44)).toEqual('-3.44')
  expect(str.cast('15')).toEqual('15')
  expect(str.cast('abc')).toEqual('abc')
  expect(str.cast()).toBeNull()
})

test('int cast required', () => {
  const str = StringParam.options({ required: true })
  expect(str.cast()).toEqual('')
  expect(str.cast('0')).toEqual('0')
  expect(str.cast('144')).toEqual('144')
})
