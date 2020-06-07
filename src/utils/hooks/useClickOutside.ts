import React, { useEffect, useRef } from 'react'

const useClickOutside = (
  shouldWatch: boolean,
  onClickOut: () => void
): [React.MutableRefObject<undefined>] => {
  const element = useRef()

  const handleClick = ({ clientX, clientY }: MouseEvent): void => {
    if (!element || !element.current) return

    const { top, bottom, left, right } = element.current.getBoundingClientRect()

    if (
      clientX < left ||
      clientX > right ||
      clientY < top ||
      clientY > bottom
    ) {
      onClickOut()
    }
  }

  useEffect(() => {
    if (shouldWatch) {
      window.addEventListener('click', handleClick)
    } else {
      window.removeEventListener('click', handleClick)
    }
    return (): void => {
      if (shouldWatch) window.removeEventListener('click', handleClick)
    }
  }, [shouldWatch])

  return [element]
}

export default useClickOutside
