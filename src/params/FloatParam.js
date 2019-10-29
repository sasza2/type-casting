import ERROR from '../errors'
import { requiredButEmpty } from './helpers'

export const validate = (value, options = {}) => {
  if (requiredButEmpty(value, options)) return { error: ERROR.REQUIRED_BUT_EMPTY }
  const number = parseFloat(value, 10)
  if (Number.isNaN(number)) return { error: ERROR.NOT_A_NUMBER }
  return null
}

export const cast = (value, options = {}) => {
  if (!options.required && (value === null || value === undefined)) return null
  return parseFloat(value, 10) || 0
}

const FloatParam = (options) => ({
  cast: (value) => cast(value, options),
  validate: (value) => validate(value, options),
})

FloatParam.options = (options) => FloatParam(options)

export default FloatParam
