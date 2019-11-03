import ArrayParam from './ArrayParam'
import FloatParam from './FloatParam'
import IntParam from './IntParam'
import ObjectParam from './ObjectParam'
import StringParam from './StringParam'
import BoolParam from './BoolParam'

const Param = {
  array: ArrayParam,
  Array: ArrayParam,
  bool: BoolParam,
  Bool: BoolParam,
  float: FloatParam,
  Float: FloatParam,
  int: IntParam,
  Int: IntParam,
  object: ObjectParam,
  Object: ObjectParam,
  string: StringParam,
  String: StringParam,
}

Param.set = (name, param) => {
  Param[name] = param
}

export default Param
