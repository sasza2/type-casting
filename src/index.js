import ObjectParam from './params/ObjectParam'

const factory = (params) => {
  if (typeof params === 'object') return ObjectParam(params)()
  return params()
}

export default factory
