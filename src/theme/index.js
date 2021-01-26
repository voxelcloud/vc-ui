import { isPlainObject } from '../utils'
let theme = {}

export const getTheme = () => {
  return theme
}

export const setTheme = (value) => {
  if (process.env.NODE_ENV !== 'production' && !isPlainObject(value)) {
    throw new Error('VC-UI: `setTheme(value)` expects a plain object argument.')
  }
  theme = value
}