import styled, { css, SimpleInterpolation } from 'styled-components'
import { screen, screenMin } from 'styles/responsive'

interface Props {
  full: boolean
}

const Wrapper = styled.div<Props>`
  ${screen.s`
    margin: 0 4%;
  `}

  ${screen.m`
    margin: 0 2%;
  `}

  ${screenMin.l`
    margin: 0 1%;
  `}

  ${({ full }): SimpleInterpolation =>
    !full &&
    css`
      ${screenMin.l`
      padding: 0 ${(100 / 14).toFixed(2)}%;
    `}
      ${screen.xl`
      padding: 0 ${((100 * 2) / 16).toFixed(2)}%;
    `}
    `}
`

export default Wrapper
