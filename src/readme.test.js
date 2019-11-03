import Factory, { ERROR, Param } from '.'

test('example test factory', () => {
  const user = Factory({
    id: Param.Int({ required: true }),
    name: Param.String,
    surname: Param.String({ required: true }),
    newsletter: Param.Bool({ default: true }),
    age: Param.Int,
  })

  expect(user.cast({
    id: 5,
    name: 'abc',
  })).toMatchObject({
    id: 5,
    name: 'abc',
    surname: '',
    newsletter: true,
  })
})

test('example array', () => {
  const list = Param.Array(Param.Int({ default: 3, required: true }))
  expect(list.cast([5, 'aaa', 6])).toMatchObject([5, 3, 6])

  expect(
    list.validate([4, 'aa', 5, null]),
  ).toMatchObject({
    errors: [
      { error: ERROR.NOT_A_NUMBER, index: 1 },
      { error: ERROR.REQUIRED_BUT_EMPTY, index: 3 },
    ],
  })
})
