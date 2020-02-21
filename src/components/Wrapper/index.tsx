import styled, { css, SimpleInterpolation } from 'styled-components'
import { screen } from 'styles/responsive'
import { toPerc, GAP, GRID_MARGIN } from 'styles/layout'

interface Props {
  full?: boolean
}

const Wrapper = styled.div<Props>`
  ${screen.s`
    margin: 0 ${toPerc(GAP.S)};
  `}

  ${screen.m`
    margin: 0 ${toPerc(GAP.M)};
  `}

  ${screen.l`
    margin: 0 ${toPerc(GAP.L)};
  `}

  ${screen.xl`
    margin: 0 ${toPerc(GAP.XL)};
  `}

  ${({ full }): SimpleInterpolation =>
    !full &&
    css`
      ${screen.l`
      margin: 0 ${toPerc(GRID_MARGIN.L)};
    `}
      ${screen.xl`
      margin: 0 ${toPerc(GRID_MARGIN.XL)};
    `}
    `}
`

export default Wrapper
