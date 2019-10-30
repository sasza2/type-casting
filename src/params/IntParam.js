import ERROR from '../errors'
import { requiredButEmpty } from './helpers'

export const validate = (value, options = {}) => {
  if (requiredButEmpty(value, options)) return { error: ERROR.REQUIRED_BUT_EMPTY }
  const number = parseInt(value, 10)
  if (Number.isNaN(number)) return { value, error: ERROR.NOT_A_NUMBER }
  return null
}

export const cast = (value, options = {}) => {
  if (!options.required && (value === null || value === undefined)) return null
  return parseInt(value, 10) || 0
}

const IntParam = (options) => ({
  cast: (value) => cast(value, options),
  validate: (value) => validate(value, options),
})

IntParam.options = (options) => IntParam(options)

export default IntParam
