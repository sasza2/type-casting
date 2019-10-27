import IntParam from './IntParam'
import { validate } from './ArrayParam'

test('array validate', () => {
  expect(validate([5, 10, 15], IntParam)).toBeNull()
  expect(validate([-3, '10', 15], IntParam)).toBeNull()
  expect(validate([], IntParam)).toBeNull()
  expect(validate([11], IntParam)).toBeNull()
})
