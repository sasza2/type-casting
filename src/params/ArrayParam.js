
import ERROR from '../errors'
import { paramWrapper, requiredButEmpty } from './helpers'

export const validate = (value, type, options = {}) => {
  if (requiredButEmpty(value, options)) return { error: ERROR.REQUIRED_BUT_EMPTY }
  if (!Array.isArray(value)) return { error: ERROR.NOT_AN_ARRAY, value }
  const errors = value.reduce((list, curr, index) => {
    const error = type().validate(curr)
    if (error) list.push({ ...error, index })
    return list
  }, [])
  return errors.length ? { error: errors, value } : null
}

export const cast = (value, type, options = {}) => {
  if (!options.required && (value === null || value === undefined)) return null
  if (!Array.isArray(value)) return []

  return value
    .map((curr) => type().cast(curr))
    .filter((curr) => curr !== null)
}

const ArrayParam = (type, options) => paramWrapper({
  cast, validate, type, options,
})

export default ArrayParam
