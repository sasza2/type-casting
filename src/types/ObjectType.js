
import ERROR from '../errors'
import { invokeType, isValidType, shouldBeOmit } from './helpers'

export const validate = (values, types) => {
  if (!values || typeof values !== 'object') return ERROR.NOT_AN_OBJECT
  const errors = Object.keys(types).reduce((list, name) => {
    const type = types[name]
    const toType = invokeType(type)
    if (!isValidType(toType)) {
      list.push({ error: ERROR.NOT_VALID_TYPE, key: name })
      return list
    }

    const error = toType.validate(values[name])
    if (error) list.push({ ...error, key: name })
    return list
  }, [])
  return errors.length ? { error: errors } : null
}

export const cast = (values, types, options = {}) => {
  if (shouldBeOmit(values, options)) return null
  if (typeof values !== 'object') return {}

  const result = {}
  Object.keys(types).forEach((name) => {
    const toType = invokeType(types[name])
    if (!isValidType(toType)) return

    const value = toType.cast(values[name])
    if (value !== null) result[name] = value
  })

  return result
}

const ObjectType = (types, options = {}) => ({
  cast: (values) => cast(values, types, options),
  validate: (values) => validate(values, types, options),
})

export default ObjectType
