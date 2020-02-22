import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

import { Book } from 'types/book'
import { BORDER_RADIUS } from 'styles/tokens'
import { screen, screenMax } from 'styles/responsive'
import { toVW, MARGIN_COLUMNS, COLUMN_WIDTH, GAP } from 'styles/layout'

const StyledBookImage = styled.figure`
  position: relative;
  margin: 0;
  box-sizing: border-box;
  padding: 2em 0;
  width: 100%;
  max-height: 500px;
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
  display: inline-block;
  width: 250px;
  box-shadow: 0 0.4em 1em rgba(0, 0, 0, 0.2), 0 0 0.6em rgba(0, 0, 0, 0.1);
`

type Props = Pick<Book, 'image'>

const BookImage: React.FC<Props> = ({ image }) => (
  <StyledBookImage style={{ background: image.colors.muted }}>
    <StyledImg
      key={image.childImageSharp.fluid.src}
      fluid={image.childImageSharp.fluid}
      style={{ background: image.colors.darkMuted }}
    />
  </StyledBookImage>
)

export default BookImage
