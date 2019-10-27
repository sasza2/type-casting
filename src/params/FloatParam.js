import ERROR from '../errors'

export const validate = (value) => {
  const number = parseFloat(value, 10)
  if (Number.isNaN(number)) return { value, error: ERROR.NOT_A_NUMBER }
  return null
}

const FloatParam = (condition) => ({
  validate: (value) => validate(value, condition),
})

FloatParam.options = (options) => FloatParam(options)

export default FloatParam
