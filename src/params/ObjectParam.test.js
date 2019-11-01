import ObjectParam, { validate } from './ObjectParam'
import IntParam from './IntParam'
import StringParam from './StringParam'
import ArrayParam from './ArrayParam'

test('object validate user', () => {
  expect(
    validate(
      {
        id: 1,
        name: 'abc',
        surname: 'def',
      },
      {
        id: IntParam,
        name: StringParam,
        surname: StringParam,
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
        id: IntParam,
        name: StringParam,
        surname: StringParam,
        email: StringParam,
        groups: ArrayParam(IntParam),
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
        id: IntParam,
        name: StringParam,
        surname: StringParam,
        email: StringParam,
        groups: ArrayParam(IntParam),
        address: ObjectParam({
          street: StringParam,
          number: IntParam,
        }),
      },
    ),
  ).toBeNull()
})

test('object cast user', () => {
  const user = ObjectParam({
    id: IntParam,
    name: StringParam,
    email: StringParam.options({ required: true }),
  })

  expect(user.cast({ id: 1 })).toMatchObject({ id: 1, email: '' })
})
