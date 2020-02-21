import React from 'react'
import styled from 'styled-components'

import { Book } from 'types/book'
import StarRating from 'components/StarRating'
import H from 'components/H'
import GridItem from 'components/Grid/GridItem'

const StyledBookTitle = styled.div`
  align-self: end;
`

const StyledTitle = styled(H)`
  margin: 0;
`

const StyledAuthor = styled(H)`
  margin: 0.5em 0 1em;
`

type Props = Pick<Book, 'title' | 'author' | 'rating7'>

const BookTitle: React.FC<Props> = ({ title, author, rating7 }) => (
  <GridItem
    as={StyledBookTitle}
    rows="2/3"
    rowsFromM="1/2"
    columnsFromM="7 / 12"
    columnsFromL="8 / 14"
    columnsFromXL="9 / 15"
  >
    <StyledTitle as="h2" size="XXL" decorative>
      {title}
    </StyledTitle>
    <StyledAuthor as="h2" size="M">
      by {author}
    </StyledAuthor>

    {rating7 && <StarRating of7={rating7} />}
  </GridItem>
)

export default BookTitle
