import React from 'react'
import styled from 'styled-components'

import { Book } from 'types/book'
import StarRating from 'components/StarRating'
import H from 'components/H'

const StyledBookTitle = styled.div`
  grid-column: 9 / 15;
  align-self: end;
`

const StyledTitle = styled(H)`
  margin: 0;
`

type Props = Pick<Book, 'title' | 'author' | 'rating7'>

const BookTitle: React.FC<Props> = ({ title, author, rating7 }) => (
  <StyledBookTitle>
    <StyledTitle as="h2" size="XXL" decorative>
      {title}
    </StyledTitle>
    <H as="h2" size="M">
      by {author}
    </H>

    {rating7 && <StarRating of7={rating7} />}
  </StyledBookTitle>
)

export default BookTitle
