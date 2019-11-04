import ERROR from '../errors'
import {
  defaultEmptyValue, defaultValue, requiredButEmpty, shouldBeOmit,
} from './helpers'

export const validate = (value, options = {}) => {
  if (requiredButEmpty(value, options)) return { error: ERROR.REQUIRED_BUT_EMPTY }
  const number = parseInt(value, 10)
  if (Number.isNaN(number)) return { error: ERROR.NOT_A_NUMBER }
  return null
}

export const cast = (value, options = {}) => {
  if (shouldBeOmit(value, options)) return defaultEmptyValue(options)
  return parseInt(value, 10) || defaultValue(options, 0)
}

const IntType = (options) => ({
  cast: (value) => cast(value, options),
  validate: (value) => validate(value, options),
})

IntType.options = (options) => IntType(options)

export default IntType
