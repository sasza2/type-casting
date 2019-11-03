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

### Array
```js
const list = ArrayParam(IntParam({ default: 3, required: true }))
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

### Bool
```js
const bool = Bool({ default: true })
console.log(bool.cast()) // true
```

### Float
```js
const float = Float()
console.log(float.cast('14.5')) // 14.5
```

### Int
```js
const int = Int({ required: true })
console.log(int.cast()) // 0
```

### Object
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

### String
