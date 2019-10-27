
import ERROR from '../errors'

export const validate = (value, types) => {
  if (!value || typeof value !== 'object') return ERROR.NOT_AN_OBJECT
  const errors = Object.keys(types).reduce((list, name, index) => {
    const type = types[name]
    const error = type().validate(value[name])
    if (error) list.push({ ...error, index })
    return list
  }, [])
  return errors.length ? { error: errors, value } : null
}

const ObjectParam = (types) => (condition) => ({
  validate: (value) => validate(value, types, condition),
})

export default ObjectParam
