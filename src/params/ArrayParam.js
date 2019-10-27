
import ERROR from '../errors'

export const validate = (value, type) => {
  if (!Array.isArray(value)) return { error: ERROR.NOT_AN_ARRAY, value }
  const errors = value.reduce((list, curr, index) => {
    const error = type().validate(curr)
    if (error) list.push({ ...error, index })
    return list
  }, [])
  return errors.length ? { error: errors, value } : null
}

const ArrayParam = (type) => (condition) => ({
  validate: (value) => validate(value, type, condition),
})

export default ArrayParam
