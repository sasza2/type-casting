import factory from '.'
import ArrayType from './types/ArrayType'
import IntType from './types/IntType'
import ObjectType from './types/ObjectType'
import StringType from './types/StringType'

test('factory validate user', () => {
  const user = factory({
    age: IntType,
  })

  expect(user.validate({ age: 20 })).toBeNull()
  expect(user.validate({ age: '55' })).toBeNull()
})

test('factory validate book', () => {
  const book = factory({
    name: StringType,
    pages: IntType,
    ISBN: StringType,
    author: ObjectType({
      name: StringType,
      surname: StringType,
      address: ArrayType(ObjectType({
        street: StringType,
        nr: StringType,
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
