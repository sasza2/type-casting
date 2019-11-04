
import ERROR from '../errors'
import {
  invokeType, requiredButEmpty, shouldBeOmit, isValidType,
} from './helpers'

export const validate = (value, type, options = {}) => {
  if (requiredButEmpty(value, options)) return { error: ERROR.REQUIRED_BUT_EMPTY }
  if (!Array.isArray(value)) return { error: ERROR.NOT_AN_ARRAY }
  const errors = value.reduce((list, curr, index) => {
    const toType = invokeType(type)
    if (!isValidType(toType)) {
      list.push({ error: ERROR.NOT_VALID_TYPE })
      return list
    }

    const error = toType.validate(curr)
    if (error) list.push({ ...error, index })
    return list
  }, [])
  return errors.length ? { errors } : null
}

export const cast = (value, type, options = {}) => {
  if (shouldBeOmit(value, options)) return null
  if (!Array.isArray(value)) return []

  const toType = invokeType(type)
  if (!isValidType(toType)) return []

  return value
    .map((curr) => toType.cast(curr))
    .filter((curr) => curr !== null)
}

const ArrayType = (type, options = {}) => ({
  cast: (value) => cast(value, type, options),
  validate: (value) => validate(value, type, options),
  options: (optionsInternal) => ArrayType(type, optionsInternal),
})

export default ArrayType
