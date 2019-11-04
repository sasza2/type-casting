import ObjectType, { validate } from './ObjectType'
import IntType from './IntType'
import StringType from './StringType'
import ArrayType from './ArrayType'

test('object validate user', () => {
  expect(
    validate(
      {
        id: 1,
        name: 'abc',
        surname: 'def',
      },
      {
        id: IntType,
        name: StringType,
        surname: StringType,
      },
    ),
  ).toBeNull()

  expect(
    validate(
      {
        id: 1,
        name: 'abc',
        surname: 'def',
        email: 'abc@o2.pl',
        groups: [1, 2, 3],
      },
      {
        id: IntType,
        name: StringType,
        surname: StringType,
        email: StringType,
        groups: ArrayType(IntType),
      },
    ),
  ).toBeNull()

  expect(
    validate(
      {
        id: 1,
        name: 'abc',
        surname: 'def',
        email: 'abc@o2.pl',
        groups: [1, 2, 3],
        address: {
          street: 'Groove',
          number: 64,
        },
      },
      {
        id: IntType,
        name: StringType,
        surname: StringType,
        email: StringType,
        groups: ArrayType(IntType),
        address: ObjectType({
          street: StringType,
          number: IntType,
        }),
      },
    ),
  ).toBeNull()
})

test('object cast user', () => {
  const user = ObjectType({
    id: IntType,
    name: StringType,
    email: StringType.options({ required: true }),
  })

  expect(user.cast({ id: 1 })).toMatchObject({ id: 1, email: '' })
})
