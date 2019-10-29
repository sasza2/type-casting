import factory from '.'
import ArrayParam from './params/ArrayParam'
import IntParam from './params/IntParam'
import ObjectParam from './params/ObjectParam'
import StringParam from './params/StringParam'

test('factory validate user', () => {
  const user = factory({
    age: IntParam,
  })

  expect(user.validate({ age: 20 })).toBeNull()
  expect(user.validate({ age: '55' })).toBeNull()
})

test('factory validate book', () => {
  const book = factory({
    name: StringParam,
    pages: IntParam,
    ISBN: StringParam,
    author: ObjectParam({
      name: StringParam,
      surname: StringParam,
      address: ArrayParam(ObjectParam({
        street: StringParam,
        nr: StringParam,
      })),
    }),
  })

  expect(book.validate(
    {
      name: 'abc',
      pages: 30,
      ISBN: 'aa-bb-cc',
      author: {
        name: 'x',
        surname: 'y',
        address: [
          {
            street: 'def',
            nr: '2/36',
          },
          {
            street: 'pow',
            nr: '2',
          },
        ],
      },
    },
  )).toBeNull()
})
