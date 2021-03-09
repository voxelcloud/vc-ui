import * as React from 'react'

const useSignedCounter = () => {
  const countRef = React.useRef(0)
  const updateCount = React.useCallback(() => {
    if (countRef.current >= Number.MAX_SAFE_INTEGER) {
      countRef.current = 0
    }
    countRef.current += 1
  }, [])
  return [countRef, updateCount]
}

export default useSignedCounter