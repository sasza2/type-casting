
import ERROR from '../errors'

export const validate = (value, type) => {
  if (!Array.isArray(value)) return { error: ERROR.NOT_AN_ARRAY, value }
  const errors = value.reduce((list, curr) => {
    const error = type().validate(curr)
    if (error) list.push(error)
    return list
  }, [])
  return errors.length ? errors : null
}

const ArrayParam = (type) => (condition) => ({
  validate: (value) => validate(value, type, condition),
})

export default ArrayParam
