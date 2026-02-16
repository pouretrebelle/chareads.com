import {
  css,
  RuleSet,
  Interpolation,
} from 'styled-components'
import { BREAKPOINT } from './tokens'

interface ResponsiveBreakpoints {
  s?: (...args: Interpolation<object>[]) => object
  m?: (...args: Interpolation<object>[]) => object
  l?: (...args: Interpolation<object>[]) => object
  xl?: (...args: Interpolation<object>[]) => object
}

const breakpointNames = Object.keys(BREAKPOINT)

const mediaQuery =
  (media: string) =>
  (...args: any[]): RuleSet<object> =>
    css`
      @media ${media} {
        ${css(...args)};
      }
    `

export const screenMin = breakpointNames.reduce(
  (acc, name, i) => {
    if (i > 0) {
      const minWidth = BREAKPOINT[breakpointNames[i - 1]]
      acc[name.toLowerCase()] = mediaQuery(`(min-width: ${minWidth}px)`)
    }
    return acc
  },
  { xl: mediaQuery(`(min-width: ${BREAKPOINT.L}px)`) }
) as ResponsiveBreakpoints

export const screenMax = breakpointNames.reduce((acc, name) => {
  const maxWidth = BREAKPOINT[name]
  acc[name.toLowerCase()] = mediaQuery(`(max-width: ${maxWidth}px)`)
  return acc
}, {}) as ResponsiveBreakpoints

export const screen = breakpointNames.reduce(
  (acc, name, i) => {
    const minWidth = i > 0 ? BREAKPOINT[breakpointNames[i - 1]] : 0
    const maxWidth = BREAKPOINT[name] - 1
    acc[name.toLowerCase()] = mediaQuery(
      `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`
    )
    return acc
  },
  { xl: mediaQuery(`(min-width: ${BREAKPOINT.L}px)`) }
) as ResponsiveBreakpoints
