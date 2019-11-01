
import ERROR from '../errors'
import { invokeType } from './helpers'

export const cast = (values, types, options = {}) => {
  if (!options.required && (values === null || values === undefined)) return null
  if (typeof values !== 'object') return {}

  const result = {}
  Object.keys(types).forEach((name) => {
    const value = invokeType(types[name]).cast(values[name])
    if (value !== null) result[name] = value
  })

  return result
}

export const validate = (values, types) => {
  if (!values || typeof values !== 'object') return ERROR.NOT_AN_OBJECT
  const errors = Object.keys(types).reduce((list, name) => {
    const type = types[name]
    const error = invokeType(type).validate(values[name])
    if (error) list.push({ ...error, key: name })
    return list
  }, [])
  return errors.length ? { error: errors } : null
}

const ObjectParam = (types, options = {}) => ({
  cast: (values) => cast(values, types, options),
  validate: (values) => validate(values, types, options),
})

export default ObjectParam
