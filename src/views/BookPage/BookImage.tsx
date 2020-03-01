import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

import { Book } from 'types/book'
import { BORDER_RADIUS, BREAKPOINT } from 'styles/tokens'
import { screen, screenMax, screenMin } from 'styles/responsive'
import { toVW, MARGIN_COLUMNS, COLUMN_WIDTH, GAP } from 'styles/layout'

const StyledBookImage = styled.figure`
  position: relative;
  margin: 0;
  box-sizing: border-box;
  padding: 1em 0;
  width: 100%;
  border-radius: ${BORDER_RADIUS.S};

  ${screenMax.m`
    text-align: center;
  `}

  ${screen.l`
    padding-left: ${toVW(MARGIN_COLUMNS.L * (COLUMN_WIDTH.L + GAP.L))};
  `}
  ${screen.xl`
    padding-left: ${toVW(MARGIN_COLUMNS.XL * (COLUMN_WIDTH.XL + GAP.XL))};
  `}
`

const StyledImg = styled(Img)`
  box-shadow: 0 0.4em 1em rgba(0, 0, 0, 0.2), 0 0 0.6em rgba(0, 0, 0, 0.1);
  vertical-align: bottom;
  transform: scale(var(--book-scale));

  ${screenMin.l`
    transform-origin: 0% 50%;
  `}
`

type Props = Pick<Book, 'image' | 'bookHeight'>

const BookImage: React.FC<Props> = ({ image, bookHeight }) => (
  <StyledBookImage style={{ background: image.colors.muted }}>
    <StyledImg
      fixed={[
        {
          ...image.childImageSharp.h200,
          media: `(max-width: ${BREAKPOINT.M - 1}px)`,
        },
        {
          ...image.childImageSharp.h300,
          media: `(min-width: ${
            BREAKPOINT.M
          }px) and (max-width: ${BREAKPOINT.L - 1}px)`,
        },
        {
          ...image.childImageSharp.h400,
          media: `(min-width: ${BREAKPOINT.L}px)`,
        },
      ]}
      style={{
        '--book-scale': ((bookHeight || 198) / 220).toFixed(2),
      }}
      backgroundColor={image.colors.darkMuted}
    />
  </StyledBookImage>
)

export default BookImage
