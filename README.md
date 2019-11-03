# type-casting

Library for casting and validating data.

## Example

```js
import Factory, { Param } from 'type-casting'

const user = Factory({
  id: Param.Int({ required: true }),
  name: Param.String,
  surname: Param.String({ required: true }),
  newsletter: Param.Bool({ default: true }),
  age: Param.Int,
})

// Print { id: 5, name: "abc", surname: "", newsletter: true }
console.log(user.cast({
  id: 5,
  name: 'abc'
}))
```

## API
Library is exporting three modules:
- Factory
- Param
- ERROR

### `Factory methods`
- cast(any) - converting to specified type
- validate(any) - validating specified type

### `Param.Array`
```js
const list = Param.Array(Param.Int({ default: 3, required: true }))
// 5, 3, 6
list.cast([5, 'aaa', 6])
/*
{ 
  errors: [
    { error: 'NOT_A_NUMBER', index: 1 },
    { error: 'REQUIRED_BUT_EMPTY', index: 3 }
  ]
}
*/
list.validate([4, 'aa', 5, null])
```

### `Param.Bool`
```js
const bool = Param.Bool({ default: true })
bool.cast() // true
bool.validate() // { 'error': 'NOT_A_BOOLEAN' }
```

### `Param.Float`
```js
const float = Param.Float()
float.cast('14.5') // 14.5
float.validate('abc') // { 'error': 'NOT_A_NUMBER' }
float.validate(500.43) // null
```

### `Param.Int`
```js
const int = Param.Int({ required: true })
int.cast() // 0
int.cast(55) // 55
int.validate('abcdef') // { 'error': 'NOT_A_NUMBER' }
```

### `Param.Object`
```js
import Factory, { Param } from 'type-casting'

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

video.cast(...)
video.validate(...)
```

or params could be defined as:

```js
import { Param } from 'type-casting'

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

Param.Video.cast(...)
```

### `Param.String`
```js
const string = Param.String({ required: true })
string.cast() // ''
string.cast(55) // '55'
string.cast('aaa') // 'aaa'
string.validate() // { error: ERROR.REQUIRED_BUT_EMPTY }
```

### `Param.set`
```js
Param.set('name', Param)
```

### `ERROR`
```js
NOT_A_NUMBER,
IS_EMPTY,
NOT_AN_ARRAY,
NOT_AN_OBJECT,
REQUIRED_BUT_EMPTY,
NOT_A_BOOLEAN,
NOT_PARAM_TYPE,
```

## Testing
```
npm run test
```