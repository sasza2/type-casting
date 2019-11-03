
import ERROR from '../errors'
import { invokeType, isParam, shouldBeOmit } from './helpers'

export const validate = (values, types) => {
  if (!values || typeof values !== 'object') return ERROR.NOT_AN_OBJECT
  const errors = Object.keys(types).reduce((list, name) => {
    const type = types[name]
    const toType = invokeType(type)
    if (!isParam(toType)) {
      list.push({ error: ERROR.NOT_PARAM_TYPE, key: name })
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
    if (!isParam(toType)) return

    const value = toType.cast(values[name])
    if (value !== null) result[name] = value
  })

  return result
}

const ObjectParam = (types, options = {}) => ({
  cast: (values) => cast(values, types, options),
  validate: (values) => validate(values, types, options),
})

export default ObjectParam
