import styled from 'styled-components'
import { FONT } from 'styles/tokens'

type HSize = 'XXL' | 'XL' | 'L' | 'M' | 'S'

interface HProps {
  size: HSize
  decorative?: boolean
}

const H = styled.h1<HProps>`
  ${({ decorative, size }): string =>
    decorative
      ? `
    font-family: ${FONT.FAMILY.DECORATIVE};
    font-weight: ${FONT.WEIGHT.REGULAR};
    font-size: ${parseFloat(FONT.SIZE[size]) * 1.5}em;
    line-height: 0.9;
  `
      : `
    font-family: ${FONT.FAMILY.BODY};
    font-size: ${FONT.SIZE[size]};
    line-height: 1.25;
  `}
`

export default H
