import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { BookCardType } from 'types/book/card'
import { shortFormatDate } from 'utils/formatting/time'
import StarRating from 'components/StarRating'
import H from 'components/H'
import { screenMin } from 'styles/responsive'

const StyledBookCard = styled(Link)`
  grid-column-end: span 2;
  margin: 0;

  ${screenMin.m`
    grid-column-end: span 3;
  `}
`

interface Props {
  book: BookCardType
}

const BookCard: React.FC<Props> = ({ book }) => {
  return (
    <StyledBookCard to={book.slug}>
      <Img
        key={book.image.childImageSharp.fluid.src}
        fluid={book.image.childImageSharp.fluid}
      />
      <H as="h2" decorative={false} size="M">
        {book.title} by {book.author}
      </H>
      {book.dateReviewed && (
        <p>
          <time>{shortFormatDate(book.dateReviewed)}</time>
        </p>
      )}
      <StarRating of7={book.rating7} />
    </StyledBookCard>
  )
}

export default BookCard
