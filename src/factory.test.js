import factory from '.'
import IntParam from './params/IntParam'

test('factory validate user', () => {
  const user = factory({
    age: IntParam,
  })

  expect(user.validate({ age: 20 })).toBeNull()
  expect(user.validate({ age: '55' })).toBeNull()
})
