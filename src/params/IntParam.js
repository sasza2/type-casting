import ERROR from '../errors'

export const validate = (value) => {
  const number = parseInt(value, 10)
  if (Number.isNaN(number)) return { value, error: ERROR.NOT_A_NUMBER }
  return null
}

const IntParam = (condition) => ({
  validate: () => validate(condition),
})

export default IntParam
