import { useState, useEffect } from 'react'

interface WindowSize {
  width: number
  height: number
}

const useWindowSize = (): WindowSize => {
  if (typeof window === 'undefined') {
    return { width: null, height: null }
  }

  const getSize = (): WindowSize => ({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    const handleResize = (): void => setWindowSize(getSize())

    window.addEventListener('resize', handleResize)
    return (): void => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export default useWindowSize
