import styled, { css } from 'styled-components'
import { FONT, COLOR } from 'styles/tokens'

const headingXL = css`
  font-size: ${FONT.SIZE.XL};
  font-weight: ${FONT.WEIGHT.MEDIUM};
  line-height: 1.25;
  color: ${COLOR.BLACK};
`

const headingL = css`
  font-size: ${FONT.SIZE.L};
  font-weight: ${FONT.WEIGHT.BOLD};
  line-height: 1.25;
  color: ${COLOR.BLACK};
`

const headingM = css`
  font-size: ${FONT.SIZE.M};
  font-weight: ${FONT.WEIGHT.BOLD};
  line-height: 1.333;
  color: ${COLOR.BLACK};
`

const textStyles = { headingXL, headingL, headingM }

const H = styled.h1`
  ${({ size }) => textStyles[`heading${size || 'M'}`]}

  ${({ decorative }) =>
    decorative &&
    `
    font-family: ${FONT.FAMILY.DECORATIVE};
    font-weight: ${FONT.WEIGHT.REGULAR};
  `}
`

export default H
