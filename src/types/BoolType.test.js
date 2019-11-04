import ERROR from '../errors'
import BoolType, { validate } from './BoolType'

test('bool validate', () => {
  expect(validate(true)).toBeNull()
  expect(validate(false)).toBeNull()
  expect(validate('699.999')).toMatchObject({ error: ERROR.NOT_A_BOOLEAN })
})

test('bool validate required empty', () => {
  const bool = BoolType.options({ required: true })
  expect(bool.validate()).toMatchObject({ error: ERROR.REQUIRED_BUT_EMPTY })
})

test('bool validate default', () => {
  const bool = BoolType.options({ default: true })
  expect(bool.cast()).toBeTruthy()
})

test('bool cast', () => {
  const bool = BoolType()
  expect(bool.cast(true)).toEqual(true)
  expect(bool.cast(false)).toEqual(false)
  expect(bool.cast(1)).toEqual(true)
  expect(bool.cast(0)).toEqual(false)
  expect(bool.cast()).toBeNull()
})

test('bool cast required', () => {
  const bool = BoolType.options({ required: true })
  expect(bool.cast()).toEqual(false)
  expect(bool.cast(0)).toEqual(false)
  expect(bool.cast(144)).toEqual(true)
})

test('bool cast default', () => {
  const bool = BoolType.options({ default: true })
  expect(bool.cast()).toEqual(true)
  expect(bool.cast(0)).toEqual(false)
})
