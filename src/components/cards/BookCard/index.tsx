import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { BookCardType } from 'types/book/card'
import StarRating from 'components/StarRating'
import { screenMin } from 'styles/responsive'

const StyledBookCard = styled(Link)`
  grid-column-end: span 2;
  margin: 0;
  padding: 1em 3em 2em;
  position: relative;

  &:hover {
    &:before {
      display: none;
    }
  }

  ${screenMin.m`
    grid-column-end: span 3;
  `}
`

const StyledImg = styled(Img)`
  box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.1), 0 0 0.3em rgba(0, 0, 0, 0.05);
`

const StyledStarRating = styled.div`
  position: absolute;
  left: 0;
  bottom: 0.5em;
  width: 100%;
  text-align: center;
`

interface Props {
  book: BookCardType
}

const BookCard: React.FC<Props> = ({ book }) => {
  return (
    <StyledBookCard
      to={book.slug}
      style={{
        background: book.image.colors.lightMuted,
        color: book.image.colors.darkVibrant,
      }}
    >
      <StyledImg
        key={book.image.childImageSharp.fluid.src}
        fluid={book.image.childImageSharp.fluid}
      />
      <StyledStarRating>
        <StarRating of7={book.rating7} />
      </StyledStarRating>
    </StyledBookCard>
  )
}

export default BookCard
