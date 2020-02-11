import styled, { css } from 'styled-components'
import { FONT } from 'styles/tokens'

const headingXL = css`
  font-size: ${FONT.SIZE.XL};
  font-weight: ${FONT.WEIGHT.REGULAR};
  line-height: 1.25;
`

const headingL = css`
  font-size: ${FONT.SIZE.L};
  font-weight: ${FONT.WEIGHT.BOLD};
  line-height: 1.25;
`

const headingM = css`
  font-size: ${FONT.SIZE.M};
  font-weight: ${FONT.WEIGHT.BOLD};
  line-height: 1.333;
`

const textStyles = { headingXL, headingL, headingM }

type HSize = 'XL' | 'L' | 'M'

interface HProps {
  size: HSize
  decorative?: boolean
}

const H = styled.h1<HProps>`
  ${({ size }): string => textStyles[`heading${size || 'M'}`]}

  ${({ decorative }): string =>
    decorative &&
    `
    font-family: ${FONT.FAMILY.DECORATIVE};
    font-weight: ${FONT.WEIGHT.REGULAR};
  `}
`

export default H
