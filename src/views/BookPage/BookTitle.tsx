import React from 'react'
import styled from 'styled-components'

import { Book } from 'types/book'
import StarRating from 'components/StarRating'
import H from 'components/H'

const StyledTitle = styled(H)`
  margin: 0 0 0.25em;
`

const StyledAuthor = styled(H)`
  margin: 0.5em 0 1em;
`

type Props = Pick<Book, 'title' | 'author' | 'rating7'>

const BookTitle: React.FC<Props> = ({ title, author, rating7 }) => (
  <>
    <StyledTitle as="h2" size="XXL" decorative>
      {title}
    </StyledTitle>
    <StyledAuthor as="h2" size="M">
      by {author}
    </StyledAuthor>

    {rating7 && <StarRating of7={rating7} />}
  </>
)

export default BookTitle
