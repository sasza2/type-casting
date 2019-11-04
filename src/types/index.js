import ArrayType from './ArrayType'
import FloatType from './FloatType'
import IntType from './IntType'
import ObjectType from './ObjectType'
import StringType from './StringType'
import BoolType from './BoolType'

const Type = {
  array: ArrayType,
  Array: ArrayType,
  bool: BoolType,
  Bool: BoolType,
  float: FloatType,
  Float: FloatType,
  int: IntType,
  Int: IntType,
  object: ObjectType,
  Object: ObjectType,
  string: StringType,
  String: StringType,
}

Type.set = (name, type) => {
  Type[name] = type
}

export default Type
