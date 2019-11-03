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

test('example bool', () => {
  const bool = Param.Bool({ default: true })
  expect(bool.cast()).toBeTruthy()
  expect(bool.validate()).toMatchObject({ error: ERROR.NOT_A_BOOLEAN })
})

test('example float', () => {
  const float = Param.Float()
  expect(float.cast('14.5')).toEqual(14.5)
  expect(float.validate('abc')).toMatchObject({ error: ERROR.NOT_A_NUMBER })
  expect(float.validate(500.43)).toBeNull()
})

test('example int', () => {
  const int = Param.Int({ required: true })
  expect(int.cast()).toEqual(0)
  expect(int.cast(55)).toEqual(55)
  expect(int.validate('abcdef')).toMatchObject({ error: ERROR.NOT_A_NUMBER })
})

test('example object address', () => {
  const address = Param.Object({
    city: Param.String,
    street: Param.String,
  })

  expect(address.cast({ city: 'aa', street: 'bb' })).toMatchObject({ city: 'aa', street: 'bb' })
})

test('example object', () => {
  const video = Factory({
    id: Param.Int({ required: true }),
    name: Param.String,
    length: Param.Int,
    authors: Param.Array(Param.Object({
      fullname: Param.String,
      address: Param.Object({
        city: Param.String,
        street: Param.String,
      }),
    })),
  })

  const obj = {
    id: 5,
    name: 'abc',
    length: 6000, // ms
    authors: [
      {
        fullname: 'aaa',
        address: {
          city: 'Qwerty',
          street: 'West',
        },
      },
      {
        fullname: 'bbb',
      },
    ],
  }

  expect(video.cast(obj)).toMatchObject(obj)
})

test('example object own model', () => {
  Param.set('Address', Param.Object({
    city: Param.String,
    street: Param.String,
  }))

  Param.set('Author', Param.Object({
    fullname: Param.String,
    address: Param.Address,
  }))

  Param.set('Authors', Param.Array(Param.Author))

  Param.set('Video', Param.Object({
    id: Param.Int({ required: true }),
    name: Param.String,
    length: Param.Int,
    authors: Param.Authors,
  }))

  const obj = {
    id: 5,
    name: 'abc',
    length: 6000, // ms
    authors: [
      {
        fullname: 'aaa',
        address: {
          city: 'Qwerty',
          street: 'West',
        },
      },
      {
        fullname: 'bbb',
      },
    ],
  }

  expect(Param.Video.cast(obj)).toMatchObject(obj)
})

test('example string', () => {
  const string = Param.String({ required: true })
  expect(string.cast()).toEqual('')
  expect(string.cast(55)).toEqual('55')
  expect(string.cast('aaa')).toEqual('aaa')
  expect(string.validate()).toMatchObject({ error: ERROR.REQUIRED_BUT_EMPTY })
})
