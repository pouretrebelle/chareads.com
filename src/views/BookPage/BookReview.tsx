import React from 'react'
import styled from 'styled-components'

import { Book } from 'types/book'

const StyledBookReview = styled.div`
  margin-top: 1em;
`

type Props = Pick<Book, 'summary' | 'html'>

const BookReview: React.FC<Props> = ({ summary, html }) => (
  <StyledBookReview>
    {summary && (
      <details style={{ fontSize: '0.75em' }}>
        <summary>Book sumary</summary>
        {summary}
      </details>
    )}

    {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
  </StyledBookReview>
)

export default BookReview
