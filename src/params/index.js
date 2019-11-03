import ArrayParam from './ArrayParam'
import FloatParam from './FloatParam'
import IntParam from './IntParam'
import ObjectParam from './ObjectParam'
import StringParam from './StringParam'
import BoolParam from './BoolParam'

const definedParams = {}

const setParam = (name, param) => {
  definedParams[name] = param
}

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
  ...definedParams,
  set: setParam,
}

export default Param
