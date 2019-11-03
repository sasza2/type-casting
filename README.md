# type-casting

Library for casting and validating data.

## Example

```js
import Factory, { Param }

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
Library is exporting two modules `Factory` and `Param`.

### Factory methods
- `cast(any)` - converting to specified type
- `validate(any)` - validating specified type

### Param.Array
```js
const list = Param.Array(Param.Int({ default: 3, required: true }))
// 5, 3, 6
console.log(list.cast([5, 'aaa', 6]))
/*
{ 
  errors: [
    { error: 'NOT_A_NUMBER', index: 1 },
    { error: 'REQUIRED_BUT_EMPTY', index: 3 }
  ]
}
*/
console.log(list.validate([4, 'aa', 5, null]))
```

### Param.Bool
```js
const bool = Param.Bool({ default: true })
console.log(bool.cast()) // true
console.log(bool.validate()) // { 'error': 'NOT_A_BOOLEAN' }

```

### Param.Float
```js
const float = Param.Float()
console.log(float.cast('14.5')) // 14.5
console.log(float.validate('abc')) // { 'error': 'NOT_A_NUMBER' }
console.log(float.validate(500.43)) // null
```

### Param.Int
```js
const int = Param.Int({ required: true })
console.log(int.cast()) // 0
console.log(int.cast(55)) // 55
console.log(int.validate('abcdef')) // { 'error': 'NOT_A_NUMBER' }
```

### Params.Object
```js
import Factory, { Param }

const video = Factory({
  id: Param.Int({ required: true }),
  name: Param.String,
  length: Param.Int,
  authors: Param.Array({
    fullname: Param.String,
    address: Param.Object({
      city: Param.String,
      street: Param.String,
    })
  })
})

console.log(user.cast({
  id: 5,
  name: 'abc'
}))
```

### String
