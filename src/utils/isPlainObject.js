
export default function isPlainObject(item) {
  return (
    item !== null &&
    typeof item === 'object' &&
    item.constructor === Object
  )
}