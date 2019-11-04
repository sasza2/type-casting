import Factory, { ERROR, Type } from '.'

test('example test factory', () => {
  const user = Factory({
    id: Type.Int({ required: true }),
    name: Type.String,
    surname: Type.String({ required: true }),
    newsletter: Type.Bool({ default: true }),
    age: Type.Int,
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
  const list = Type.Array(Type.Int({ default: 3, required: true }))
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
  const bool = Type.Bool({ default: true })
  expect(bool.cast()).toBeTruthy()
  expect(bool.validate()).toMatchObject({ error: ERROR.NOT_A_BOOLEAN })
})

test('example float', () => {
  const float = Type.Float()
  expect(float.cast('14.5')).toEqual(14.5)
  expect(float.validate('abc')).toMatchObject({ error: ERROR.NOT_A_NUMBER })
  expect(float.validate(500.43)).toBeNull()
})

test('example int', () => {
  const int = Type.Int({ required: true })
  expect(int.cast()).toEqual(0)
  expect(int.cast(55)).toEqual(55)
  expect(int.validate('abcdef')).toMatchObject({ error: ERROR.NOT_A_NUMBER })
})

test('example object address', () => {
  const address = Type.Object({
    city: Type.String,
    street: Type.String,
  })

  expect(address.cast({ city: 'aa', street: 'bb' })).toMatchObject({ city: 'aa', street: 'bb' })
})

test('example object', () => {
  const video = Factory({
    id: Type.Int({ required: true }),
    name: Type.String,
    length: Type.Int,
    authors: Type.Array(Type.Object({
      fullname: Type.String,
      address: Type.Object({
        city: Type.String,
        street: Type.String,
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
  Type.set('Address', Type.Object({
    city: Type.String,
    street: Type.String,
  }))

  Type.set('Author', Type.Object({
    fullname: Type.String,
    address: Type.Address,
  }))

  Type.set('Authors', Type.Array(Type.Author))

  Type.set('Video', Type.Object({
    id: Type.Int({ required: true }),
    name: Type.String,
    length: Type.Int,
    authors: Type.Authors,
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

  expect(Type.Video.cast(obj)).toMatchObject(obj)
})

test('example string', () => {
  const string = Type.String({ required: true })
  expect(string.cast()).toEqual('')
  expect(string.cast(55)).toEqual('55')
  expect(string.cast('aaa')).toEqual('aaa')
  expect(string.validate()).toMatchObject({ error: ERROR.REQUIRED_BUT_EMPTY })
})
