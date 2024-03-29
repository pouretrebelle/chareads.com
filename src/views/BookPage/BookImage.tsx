import React from 'react'
import styled from 'styled-components'

import { Book } from 'types/book'
import { BORDER_RADIUS } from 'styles/tokens'
import { screen, screenMin } from 'styles/responsive'
import { toVW, MARGIN_COLUMNS, COLUMN_WIDTH, GAP } from 'styles/layout'
import Image, { ImageColor } from 'components/Image'

const StyledBookImage = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0;
  box-sizing: border-box;
  padding: 1em 0;
  width: auto;
  height: 100%;
  border-radius: ${BORDER_RADIUS.S};

  ${screenMin.l`
    justify-content: start;
  `}

  ${screen.l`
    padding-left: ${toVW(MARGIN_COLUMNS.L * (COLUMN_WIDTH.L + GAP.L))};
  `}
  ${screen.xl`
    padding-left: ${toVW(MARGIN_COLUMNS.XL * (COLUMN_WIDTH.XL + GAP.XL))};
  `}

  img {
    max-height: 200px;

    ${screenMin.m`
      max-height: 300px;
    `}

    ${screenMin.l`
      max-height: 400px;
    `}
  }
`

const StyledImg = styled(Image)`
  box-shadow: 0 0.4em 1em rgba(0, 0, 0, 0.2), 0 0 0.6em rgba(0, 0, 0, 0.1);
  vertical-align: bottom;
  transform: scale(var(--book-scale));

  ${screenMin.l`
    transform-origin: 0% 50%;
  `}
`

type Props = Pick<Book, 'image' | 'bookHeight'>

const BookImage: React.FC<Props> = ({ image, bookHeight }) => (
  <StyledBookImage style={{ background: image.childImageColors.muted }}>
    <StyledImg
      image={image}
      background={ImageColor.DarkMuted}
      style={{
        '--book-scale': ((bookHeight || 198) / 220).toFixed(2),
      }}
    />
  </StyledBookImage>
)

export default BookImage
