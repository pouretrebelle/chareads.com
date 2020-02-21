import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

import { Book } from 'types/book'

const StyledBookSpacer = styled.div`
  grid-column: 1 / 3;
  border-radius: 2px;
`

const StyledBookImage = styled.figure`
  position: relative;
  grid-column: 3 / 9;
  margin: 0;
  padding: 2em 0;
  max-height: 500px;
  background: currentColor;
  border-radius: 2px;

  &:before {
    content: '';
    position: absolute;
    background: currentColor;
    top: 0;
    right: 90%;
    height: 100%;
    width: 20%;
  }
`

const StyledImg = styled(Img)`
  width: 250px;
  box-shadow: 0 0.4em 1em rgba(0, 0, 0, 0.2), 0 0 0.6em rgba(0, 0, 0, 0.1);
`

type Props = Pick<Book, 'image'>

const BookImage: React.FC<Props> = ({ image }) => (
  <>
    <StyledBookSpacer style={{ background: image.colors.muted }} />
    <StyledBookImage style={{ color: image.colors.muted }}>
      <StyledImg
        key={image.childImageSharp.fluid.src}
        fluid={image.childImageSharp.fluid}
        style={{ background: image.colors.darkMuted }}
      />
    </StyledBookImage>
  </>
)

export default BookImage
