/**
 * 首字母大写
 * @param {*} string 
 */
export default function capitalize(string) {
  if (process.env.NODE_ENV !== 'production' && typeof string !== 'string') {
    throw new Error('VC-UI: `capitalize(string)` expects a string argument.')
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}