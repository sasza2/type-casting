export const requiredButEmpty = (value, options) => {
  if (!options.required) return false
  return value === null || value === undefined
}

export const invokeType = (type) => (typeof type === 'function'
  ? type()
  : type
)
