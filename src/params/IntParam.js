import ERROR from '../errors'

export const validate = (value) => {
  const number = parseInt(value, 10)
  if (Number.isNaN(number)) return { value, error: ERROR.NOT_A_NUMBER }
  return null
}

class IntParam {
  constructor(conditions) {
    this.conditions = conditions;
  }

  validate(value) {
    return validate(value, this.conditions)
  }
}

export default IntParam
