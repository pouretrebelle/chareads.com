import styled, { SimpleInterpolation } from 'styled-components'
import { FONT } from 'styles/tokens'
import { screenMax } from 'styles/responsive'

type HSize = 'XXL' | 'XL' | 'L' | 'M' | 'S'

interface HProps {
  size: HSize
  decorative?: boolean
}

const sizeMultiplier = (decorative): number => (decorative ? 1.5 : 1)

const H = styled.h1<HProps>`
  ${({ decorative, size }): string => `
    ${
      decorative
        ? `
      font-family: ${FONT.FAMILY.DECORATIVE};
      font-weight: ${FONT.WEIGHT.REGULAR};
      line-height: 0.8;
    `
        : `
      font-family: ${FONT.FAMILY.BODY};
      line-height: 1.25;
    `
    }

    font-size: ${parseFloat(FONT.SIZE[size]) * sizeMultiplier(decorative)}em;
  `}

  ${({ decorative, size }): SimpleInterpolation =>
    (size as string) === 'XXL' &&
    screenMax.m`
    font-size: ${
      (parseFloat(FONT.SIZE[size]) * sizeMultiplier(decorative)) / 1.25
    }em;
  `}
`

export default H
