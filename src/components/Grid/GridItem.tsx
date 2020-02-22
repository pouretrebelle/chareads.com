import styled, { css, SimpleInterpolation } from 'styled-components'

import { screenMin } from 'styles/responsive'

interface Props {
  as?: React.ElementType
  span?: number
  columns?: string
  spanRows?: number
  rows?: string
  spanFromM?: number
  columnsFromM?: string
  spanRowsFromM?: number
  rowsFromM?: string
  spanFromL?: number
  columnsFromL?: string
  spanRowsFromL?: number
  rowsFromL?: string
  spanFromXL?: number
  columnsFromXL?: string
  spanRowsFromXL?: number
  rowsFromXL?: string
}

const GridItem = styled.div<Props>`
  ${({ span, columns, spanRows, rows }): SimpleInterpolation => css`
    ${!span && !columns && `grid-column: 1 / -1;`}
    ${span && `grid-column-end: span ${span};`}
    ${spanRows && `grid-row-end: span ${spanRows};`}
    ${columns && `grid-column: ${columns};`}
    grid-row: ${rows};
  `}

  ${({
    spanFromM,
    spanRowsFromM,
    columnsFromM,
    rowsFromM,
  }): SimpleInterpolation => screenMin.m`
    ${spanFromM && `grid-column-end: span ${spanFromM};`}
    ${spanRowsFromM && `grid-row-end: span ${spanRowsFromM};`}
    grid-column: ${columnsFromM};
    grid-row: ${rowsFromM};
  `}

  ${({
    spanFromL,
    spanRowsFromL,
    columnsFromL,
    rowsFromL,
  }): SimpleInterpolation => screenMin.l`
    ${spanFromL && `grid-column-end: span ${spanFromL};`}
    ${spanRowsFromL && `grid-row-end: span ${spanRowsFromL};`}
    grid-column: ${columnsFromL};
    grid-row: ${rowsFromL};
  `}

  ${({
    spanFromXL,
    spanRowsFromXL,
    columnsFromXL,
    rowsFromXL,
  }): SimpleInterpolation => screenMin.xl`
    ${spanFromXL && `grid-column-end: span ${spanFromXL};`}
    ${spanRowsFromXL && `grid-row-end: span ${spanRowsFromXL};`}
    grid-column: ${columnsFromXL};
    grid-row: ${rowsFromXL};
  `}
`

export default GridItem
