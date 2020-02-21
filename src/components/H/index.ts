import styled, { css } from 'styled-components'
import { FONT } from 'styles/tokens'

const headingXXL = css`
  font-size: ${FONT.SIZE.XXL};
  font-weight: ${FONT.WEIGHT.REGULAR};
  line-height: 1.25;
`

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

const headingS = css`
  font-size: ${FONT.SIZE.S};
  font-weight: ${FONT.WEIGHT.BOLD};
  line-height: 1.333;
`

const textStyles = { headingXXL, headingXL, headingL, headingM, headingS }

type HSize = 'XXL' | 'XL' | 'L' | 'M' | 'S'

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
    line-height: 1;
  `}
`

export default H
