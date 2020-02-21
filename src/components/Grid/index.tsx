import styled, { css, SimpleInterpolation } from 'styled-components'
import { screen } from 'styles/responsive'
import {
  toVW,
  toPerc,
  GAP,
  COLUMNS,
  GRID_MARGIN,
  MARGIN_COLUMNS,
} from 'styles/layout'

interface Props {
  as?: React.ElementType
  full?: boolean
}

const Grid = styled.div<Props>`
  display: flex;
  flex-wrap: wrap;
  display: grid;
  grid-auto-flow: dense;

  ${screen.s`
    margin: 0 ${toPerc(GAP.S)};
    grid-template-columns: repeat(${COLUMNS.S}, 1fr);
    grid-gap: ${toVW(GAP.S)};
  `}

  ${screen.m`
    margin: 0 ${toPerc(GAP.M)};
    grid-template-columns: repeat(${COLUMNS.M}, 1fr);
    grid-gap: ${toVW(GAP.M)};
  `}

  ${screen.l`
    margin: 0 ${toPerc(GAP.L)};
    grid-template-columns: repeat(${COLUMNS.L}, 1fr);
    grid-gap: ${toVW(GAP.L)};
  `}

  ${screen.xl`
    margin: 0 ${toPerc(GAP.XL)};
    grid-template-columns: repeat(${COLUMNS.XL}, 1fr);
    grid-gap: ${toVW(GAP.XL)};
  `}

  ${({ full }): SimpleInterpolation =>
    !full &&
    css`
      ${screen.l`
      margin: 0 ${toPerc(GRID_MARGIN.L)};
      grid-template-columns: repeat(${COLUMNS.L - MARGIN_COLUMNS.L * 2}, 1fr);
    `}
      ${screen.xl`
      margin: 0 ${toPerc(GRID_MARGIN.XL)};
      grid-template-columns: repeat(${COLUMNS.XL - MARGIN_COLUMNS.XL * 2}, 1fr);
    `}
    `}
`
export default Grid
