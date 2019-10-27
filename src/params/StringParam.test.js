import ERROR from '../errors'
import { validate } from './StringParam'

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
