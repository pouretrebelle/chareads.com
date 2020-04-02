import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

const isBrowser = typeof window !== `undefined`

const getScrollPosition = (
  element: React.RefObject<React.ReactNode>
): number => {
  if (!isBrowser) return 0

  const target = (element.current || document.body) as HTMLElement
  return target.getBoundingClientRect().bottom - window.innerHeight
}

const useScrollPosition = (
  effect: (pos: number) => void,
  wait: number,
  deps: any[], // eslint-disable-line
  element?: React.RefObject<React.ReactNode>
): void => {
  let throttleTimeout = null

  const callback = (): void => {
    effect(getScrollPosition(element))
    throttleTimeout = null
  }

  useIsomorphicLayoutEffect(() => {
    if (!isBrowser) {
      return
    }

    const handleScroll = (): void => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callback, wait)
        }
      } else {
        callback()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return (): void => window.removeEventListener('scroll', handleScroll)
  }, deps || [])
}

export default useScrollPosition
