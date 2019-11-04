import ArrayType, { validate } from './ArrayType'
import FloatType from './FloatType'
import IntType from './IntType'
import StringType from './StringType'

test('array validate int', () => {
  expect(validate([5, 10, 15], IntType)).toBeNull()
  expect(validate([-3, '10', 15], IntType)).toBeNull()
  expect(validate([], IntType)).toBeNull()
  expect(validate([11], IntType)).toBeNull()
})

test('array validate float', () => {
  expect(validate([5.3, 10, 15.55], FloatType)).toBeNull()
  expect(validate([-3.2, '10.33', 15], FloatType)).toBeNull()
  expect(validate([], FloatType)).toBeNull()
  expect(validate([500.42], FloatType)).toBeNull()
})

test('array validate string', () => {
  expect(validate(['afdsa', 10, 'gasgas'], StringType)).toBeNull()
  expect(validate(['agsa', '10.33', 'gg'], StringType)).toBeNull()
  expect(validate([], StringType)).toBeNull()
  expect(validate(['abcdef'], StringType)).toBeNull()
})

test('array validate array of int', () => {
  expect(validate([[5, 10], [15], [20, -11]], ArrayType(IntType))).toBeNull()
  expect(validate([[-3, '10', 15]], ArrayType(IntType))).toBeNull()
  expect(validate([], ArrayType(IntType))).toBeNull()
  expect(validate([[11]], ArrayType(IntType))).toBeNull()
})

test('array validate int', () => {
  expect(validate([5, 10, 15], IntType)).toBeNull()
  expect(validate([-3, '10', 15], IntType)).toBeNull()
  expect(validate([], IntType)).toBeNull()
  expect(validate([11], IntType)).toBeNull()
})

test('array validate bad int type', () => {
  expect(validate(['aa', 10, 15], IntType)).toBeTruthy()
  expect(validate([-3, 'x', 15], IntType)).toBeTruthy()
  expect(validate(null, IntType)).toBeTruthy()
  expect(validate(['def'], IntType)).toBeTruthy()
})

test('array validate bad float type', () => {
  expect(validate(['aa', 10.4, 15.1], FloatType)).toBeTruthy()
  expect(validate([-3.6, 'x', 15], FloatType)).toBeTruthy()
})

test('array validate bad string type', () => {
  expect(validate(['aa', null, 15], IntType)).toBeTruthy()
  expect(validate([-3, 'x', undefined], IntType)).toBeTruthy()
})

test('array validate bad array of int', () => {
  expect(validate([[5, 10], ['test'], [20, -11]], ArrayType(IntType))).toBeTruthy()
  expect(validate([[-3, '10', 'aa']], ArrayType(IntType))).toBeTruthy()
})

test('array cast', () => {
  const number = ArrayType(IntType)
  expect(number.cast([441.1])).toMatchObject([441])
  expect(number.cast([5, 4, '3', null, 1, 0])).toMatchObject([5, 4, 3, 1, 0])
  const str = ArrayType(StringType.options({ required: true }))
  expect(str.cast(['aa', null, 'bb'])).toMatchObject(['aa', '', 'bb'])
})

test('array cast required', () => {
  const number = ArrayType(IntType).options({ required: true })
  expect(number.cast()).toMatchObject([])
  expect(number.cast(null)).toMatchObject([])
  const str = ArrayType(StringType.options({ required: true }))
  expect(str.cast(['aa', 'bb'])).toMatchObject(['aa', 'bb'])
  const strDefault = ArrayType(StringType.options({ default: 'xyz' }))
  expect(strDefault.cast([null, 'aa', null])).toMatchObject(['xyz', 'aa', 'xyz'])
})

test('array one item', () => {
  const numbers = ArrayType(IntType)
  expect(numbers.cast(5)).toMatchObject([5])
  expect(numbers.cast('14')).toMatchObject([14])
})

test('array default', () => {
  const numbers = ArrayType(IntType).options({ default: [1, 2] })
  expect(numbers.cast()).toMatchObject([1, 2])
})
