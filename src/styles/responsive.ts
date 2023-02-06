import {
  css,
  FlattenSimpleInterpolation,
  SimpleInterpolation,
} from 'styled-components'
import { BREAKPOINT } from './tokens'

interface ResponsiveBreakpoints {
  s?: (...args: SimpleInterpolation[]) => object
  m?: (...args: SimpleInterpolation[]) => object
  l?: (...args: SimpleInterpolation[]) => object
  xl?: (...args: SimpleInterpolation[]) => object
}

const breakpointNames = Object.keys(BREAKPOINT)

const mediaQuery =
  (media: string) =>
  (...args: SimpleInterpolation[]): FlattenSimpleInterpolation =>
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
}, object) as ResponsiveBreakpoints

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
