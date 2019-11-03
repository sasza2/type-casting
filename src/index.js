import Param from './params'

const factory = (params) => {
  if (typeof params === 'object') return Param.Object(params)
  return params()
}

export { default as ERROR } from './errors'
export { default as Param } from './params'
export default factory
