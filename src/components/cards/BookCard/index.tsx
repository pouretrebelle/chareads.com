import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { BookCardType } from 'types/book/card'
import { shortFormatDate } from 'utils/formatting/time'
import StarRating from 'components/StarRating'
import H from 'components/H'

interface Props {
  book: BookCardType
}

const BookCard: React.FC<Props> = ({ book }) => {
  return (
    <Link
      to={book.slug}
      style={{
        display: 'inline-block',
        width: 200,
        margin: 0,
        verticalAlign: 'top',
      }}
    >
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
    </Link>
  )
}

export default BookCard
