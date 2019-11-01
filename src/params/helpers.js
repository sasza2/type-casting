export const requiredButEmpty = (value, options) => {
  if (!options.required) return false
  return value === null || value === undefined
}

export const paramWrapper = ({
  cast, validate, type, options = {},
}) => {
  const toCast = (value) => cast(value, type, options)
  const toValidate = (value) => validate(value, type, options)

  const wrapper = () => ({
    cast: toCast,
    validate: toValidate,
  })

  wrapper.cast = toCast
  wrapper.validate = toValidate

  wrapper.options = (optionsInternal) => paramWrapper({
    cast, validate, type, options: optionsInternal,
  })

  return wrapper
}
