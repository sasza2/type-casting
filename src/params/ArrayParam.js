
import ERROR from '../errors'
import { invokeType, requiredButEmpty, shouldBeOmit } from './helpers'

export const validate = (value, type, options = {}) => {
  if (requiredButEmpty(value, options)) return { error: ERROR.REQUIRED_BUT_EMPTY }
  if (!Array.isArray(value)) return { error: ERROR.NOT_AN_ARRAY, value }
  const errors = value.reduce((list, curr, index) => {
    const error = invokeType(type).validate(curr)
    if (error) list.push({ ...error, index })
    return list
  }, [])
  return errors.length ? { error: errors, value } : null
}

export const cast = (value, type, options = {}) => {
  if (shouldBeOmit(value, options)) return null
  if (!Array.isArray(value)) return []

  return value
    .map((curr) => invokeType(type).cast(curr))
    .filter((curr) => curr !== null)
}

const ArrayParam = (type, options = {}) => ({
  cast: (value) => cast(value, type, options),
  validate: (value) => validate(value, type, options),
  options: (optionsInternal) => ArrayParam(type, optionsInternal),
})

export default ArrayParam
