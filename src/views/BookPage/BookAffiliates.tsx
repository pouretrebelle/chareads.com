import React from 'react'
import styled from 'styled-components'

import { Book } from 'types/book'
import { AFFILIATES } from 'utils/urls/affiliates'
import { FONT } from 'styles/tokens'
import GridItem from 'components/Grid/GridItem'

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
  <GridItem
    as="ol"
    spanFromM={4}
    columnsFromL="5/8"
    columnsFromXL="6/9"
    rowsFromM="3/12"
    rowsFromL="2/12"
  >
    {Object.entries(AFFILIATE_ACTIONS).map(([affiliateAbbr, label]) => (
      <StyledLi key={affiliateAbbr}>
        <a href={links.long[affiliateAbbr]}>{label}</a>
      </StyledLi>
    ))}
  </GridItem>
)

export default BookAffiliates
