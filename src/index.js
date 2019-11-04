import Type from './types'

const factory = (type) => (
  typeof type === 'object'
    ? Type.Object(type)
    : type()
)

export { default as ERROR } from './errors'
export { default as Type } from './types'
export default factory
