# type-casting

Library for cast and validating data.

## Installing
```
npm install type-casting
```

## Example

```js
import Factory, { Type } from 'type-casting'

const user = Factory({
  id: Type.Int({ required: true }),
  name: Type.String,
  surname: Type.String({ required: true }),
  newsletter: Type.Bool({ default: true }),
  age: Type.Int,
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
- Type
- ERROR

### `Factory methods`
- cast(any) - cast to specified type
- validate(any) - validate specified type

### `Type.Array`
```js
const list = Type.Array(Type.Int({ default: 3, required: true }))
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

### `Type.Bool`
```js
const bool = Type.Bool({ default: true })
bool.cast() // true
bool.validate() // { 'error': 'NOT_A_BOOLEAN' }
bool.cast(true) // true
bool.cast(false) // false
```

### `Type.Float`
```js
const float = Type.Float()
float.cast('14.5') // 14.5
float.validate('abc') // { 'error': 'NOT_A_NUMBER' }
float.validate(500.43) // null
```

### `Type.Int`
```js
const int = Type.Int({ required: true })
int.cast() // 0
int.cast(55) // 55
int.validate('abcdef') // { 'error': 'NOT_A_NUMBER' }
```

### `Type.Object`
```js
import Factory, { Type } from 'type-casting'

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

video.cast(...)
video.validate(...)
```

or types could be defined as:

```js
import { Type } from 'type-casting'

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

Type.Video.cast(...)
```

### `Type.String`
```js
const string = Type.String({ required: true })
string.cast() // ''
string.cast(55) // '55'
string.cast('aaa') // 'aaa'
string.validate() // { error: ERROR.REQUIRED_BUT_EMPTY }
```

### `Type.set`
```js
Type.set('name', Type)
```

### `ERROR`
```js
NOT_A_NUMBER,
IS_EMPTY,
NOT_AN_ARRAY,
NOT_AN_OBJECT,
REQUIRED_BUT_EMPTY,
NOT_A_BOOLEAN,
NOT_VALID_TYPE,
```

## Testing
```
npm run test
```

## Building
```
npm run build
```