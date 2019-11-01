export const requiredButEmpty = (value, options) => {
  if (!options.required) return false
  return value === null || value === undefined
}

export const invokeType = (type) => (typeof type === 'function'
  ? type()
  : type
)

export const defaultValue = (options, base) => (options.default ? options.default : base)

export const defaultEmptyValue = (options) => defaultValue(options, null)

export const shouldBeOmit = (value, options) => !options.required
  && (value === null || value === undefined)
