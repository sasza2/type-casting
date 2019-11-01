import ArrayParam, { validate } from './ArrayParam'
import FloatParam from './FloatParam'
import IntParam from './IntParam'
import StringParam from './StringParam'

test('array validate int', () => {
  expect(validate([5, 10, 15], IntParam)).toBeNull()
  expect(validate([-3, '10', 15], IntParam)).toBeNull()
  expect(validate([], IntParam)).toBeNull()
  expect(validate([11], IntParam)).toBeNull()
})

test('array validate float', () => {
  expect(validate([5.3, 10, 15.55], FloatParam)).toBeNull()
  expect(validate([-3.2, '10.33', 15], FloatParam)).toBeNull()
  expect(validate([], FloatParam)).toBeNull()
  expect(validate([500.42], FloatParam)).toBeNull()
})

test('array validate string', () => {
  expect(validate(['afdsa', 10, 'gasgas'], StringParam)).toBeNull()
  expect(validate(['agsa', '10.33', 'gg'], StringParam)).toBeNull()
  expect(validate([], StringParam)).toBeNull()
  expect(validate(['abcdef'], StringParam)).toBeNull()
})

test('array validate array of int', () => {
  expect(validate([[5, 10], [15], [20, -11]], ArrayParam(IntParam))).toBeNull()
  expect(validate([[-3, '10', 15]], ArrayParam(IntParam))).toBeNull()
  expect(validate([], ArrayParam(IntParam))).toBeNull()
  expect(validate([[11]], ArrayParam(IntParam))).toBeNull()
})

test('array validate int', () => {
  expect(validate([5, 10, 15], IntParam)).toBeNull()
  expect(validate([-3, '10', 15], IntParam)).toBeNull()
  expect(validate([], IntParam)).toBeNull()
  expect(validate([11], IntParam)).toBeNull()
})

test('array validate bad int type', () => {
  expect(validate(['aa', 10, 15], IntParam)).toBeTruthy()
  expect(validate([-3, 'x', 15], IntParam)).toBeTruthy()
  expect(validate(null, IntParam)).toBeTruthy()
  expect(validate(['def'], IntParam)).toBeTruthy()
})

test('array validate bad float type', () => {
  expect(validate(['aa', 10.4, 15.1], FloatParam)).toBeTruthy()
  expect(validate([-3.6, 'x', 15], FloatParam)).toBeTruthy()
})

test('array validate bad string type', () => {
  expect(validate(['aa', null, 15], IntParam)).toBeTruthy()
  expect(validate([-3, 'x', undefined], IntParam)).toBeTruthy()
})

test('array validate bad array of int', () => {
  expect(validate([[5, 10], ['test'], [20, -11]], ArrayParam(IntParam))).toBeTruthy()
  expect(validate([[-3, '10', 'aa']], ArrayParam(IntParam))).toBeTruthy()
})

test('array validate', () => {
  const number = ArrayParam(IntParam)
  expect(number.cast([441.1])).toMatchObject([441])
})
