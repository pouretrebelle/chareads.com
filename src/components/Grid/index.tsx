import styled, { css, SimpleInterpolation } from 'styled-components'
import { screen, screenMin } from 'styles/responsive'

interface Props {
  full: boolean
}

const Grid = styled.div<Props>`
  display: flex;
  flex-wrap: wrap;
  display: grid;
  grid-auto-flow: dense;
  grid-gap: 1vw;

  ${screen.s`
    grid-template-columns: repeat(2, 1fr);
    margin: 0 4%;
    grid-gap: 4vw;
  `}

  ${screen.m`
    grid-template-columns: repeat(12, 1fr);
    margin: 0 2%;
    grid-gap: 2vw;
  `}

  ${screenMin.l`
    grid-template-columns: repeat(12, 1fr);
    margin: 0 1%;
    grid-gap: 1vw;
    grid-template-columns: repeat(14, 1fr);
  `}

  ${screen.xl`
    grid-template-columns: repeat(16, 1fr);
  `}

  ${({ full }): SimpleInterpolation =>
    !full &&
    css`
      ${screenMin.l`
      padding: 0 ${(100 / 14).toFixed(2)}%;
      grid-template-columns: repeat(12, 1fr);
    `}
      ${screen.xl`
      padding: 0 ${((100 * 2) / 16).toFixed(2)}%;
      grid-template-columns: repeat(12, 1fr);
    `}
    `}
`

export default Grid
