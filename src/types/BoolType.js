import ERROR from '../errors'
import {
  defaultEmptyValue, defaultValue, requiredButEmpty, shouldBeOmit,
} from './helpers'

export const validate = (value, options = {}) => {
  if (requiredButEmpty(value, options)) return { error: ERROR.REQUIRED_BUT_EMPTY }
  if (typeof value !== 'boolean') return { error: ERROR.NOT_A_BOOLEAN }
  return null
}

export const cast = (value, options = {}) => {
  if (shouldBeOmit(value, options)) return defaultEmptyValue(options, null)
  if (value === null || value === undefined) return defaultValue(options, false)
  return !!value
}

const BoolType = (options) => ({
  cast: (value) => cast(value, options),
  validate: (value) => validate(value, options),
})

BoolType.options = (options) => BoolType(options)

export default BoolType
