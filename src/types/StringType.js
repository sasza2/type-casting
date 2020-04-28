import ERROR from '../errors'
import { defaultEmptyValue, defaultValue, requiredButEmpty } from './helpers'

export const validate = (value, options = {}) => {
  if (requiredButEmpty(value, options)) return { error: ERROR.REQUIRED_BUT_EMPTY }
  if (!value) return { error: ERROR.IS_EMPTY }
  return null
}

export const cast = (value, options = {}) => {
  if (!options.required && value === undefined) return defaultEmptyValue(options)
  return value ? value.toString() : defaultValue(options, '')
}

const StringType = (options) => ({
  cast: (value) => cast(value, options),
  validate: (value) => validate(value, options),
})

StringType.options = (options) => StringType(options)

export default StringType
