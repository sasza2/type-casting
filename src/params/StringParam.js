import ERROR from '../errors'

export const validate = (value, options = {}) => {
  if (options.required && !value) return { error: ERROR.REQUIRED_BUT_EMPTY }
  if (!value) return { error: ERROR.IS_EMPTY }
  return null
}

export const cast = (value, options = {}) => {
  if (!options.required && !value) return null
  return value.toString()
}

const StringParam = (options) => ({
  cast: (value) => cast(value, options),
  validate: (value) => validate(value, options),
})

StringParam.options = (options) => StringParam(options)

export default StringParam
