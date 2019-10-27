import ERROR from '../errors'

export const validate = (value) => {
  if (!value) return { error: ERROR.IS_EMPTY }
  return null
}

const StringParam = (options) => ({
  validate: (value) => validate(value, options),
})

StringParam.options = (options) => StringParam(options)

export default StringParam
