import React from 'react'
import styled from 'styled-components'

import { Book } from 'types/book'
import { AFFILIATES } from 'utils/urls/affiliates'
import { FONT } from 'styles/tokens'

const AFFILIATE_ACTIONS = {
  [AFFILIATES.GOODREADS]: 'See on Goodreads',
  [AFFILIATES.AMAZON]: 'Buy on Amazon',
  [AFFILIATES.BOOK_DEPOSITORY]: 'Buy on Book Depository',
}

const StyledLi = styled.li`
  font-size: ${FONT.SIZE.S};
  position: relative;

  &:before {
    content: '🔗';
    position: absolute;
    left: -2em;
  }
`

type Props = Pick<Book, 'links'>

const BookAffiliates: React.FC<Props> = ({ links }) => (
  <ol>
    {Object.entries(AFFILIATE_ACTIONS).map(([affiliateAbbr, label]) => (
      <StyledLi key={affiliateAbbr}>
        <a href={links.long[affiliateAbbr]}>{label}</a>
      </StyledLi>
    ))}
  </ol>
)

export default BookAffiliates
