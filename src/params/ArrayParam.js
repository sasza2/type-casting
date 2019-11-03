
import ERROR from '../errors'
import {
  invokeType, requiredButEmpty, shouldBeOmit, isParam,
} from './helpers'

export const validate = (value, type, options = {}) => {
  if (requiredButEmpty(value, options)) return { error: ERROR.REQUIRED_BUT_EMPTY }
  if (!Array.isArray(value)) return { error: ERROR.NOT_AN_ARRAY }
  const errors = value.reduce((list, curr, index) => {
    const toType = invokeType(type)
    if (!isParam(toType)) {
      list.push({ error: ERROR.NOT_PARAM_TYPE })
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
  if (!isParam(toType)) return []

  return value
    .map((curr) => toType.cast(curr))
    .filter((curr) => curr !== null)
}

const ArrayParam = (type, options = {}) => ({
  cast: (value) => cast(value, type, options),
  validate: (value) => validate(value, type, options),
  options: (optionsInternal) => ArrayParam(type, optionsInternal),
})

export default ArrayParam
