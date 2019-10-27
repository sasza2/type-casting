import ERROR from '../errors'

export const validate = (value) => {
  if (!value) return { error: ERROR.IS_EMPTY }
  return null
}

const StringParam = (condition) => ({
  validate: () => validate(condition),
})

export default StringParam
