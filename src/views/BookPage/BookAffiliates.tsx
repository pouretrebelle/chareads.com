import React from 'react'
import styled from 'styled-components'

import { Book } from 'types/book'
import { AFFILIATES } from 'utils/urls/affiliates'
import { FONT } from 'styles/tokens'
import { screenMin } from 'styles/responsive'
import ArrowIcon from 'components/icons/ArrowIcon'

const AFFILIATE_ACTIONS = {
  [AFFILIATES.GOODREADS]: 'See on Goodreads',
  [AFFILIATES.AMAZON]: 'Buy on Amazon',
  [AFFILIATES.BOOK_DEPOSITORY]: 'Buy on Book Depository',
}

const StyledOl = styled.ol`
  && {
    margin: 0 0 1em;
  }
`

const StyledLi = styled.li`
  font-size: ${FONT.SIZE.S};

  ${screenMin.l`
    margin-left: -1.5em;
  `}
`

const StyledArrowIcon = styled(ArrowIcon)`
  margin: 0 0.75em 0 0;
`

type Props = Pick<Book, 'links'>

const BookAffiliates: React.FC<Props> = ({ links }) => (
  <StyledOl>
    {Object.entries(AFFILIATE_ACTIONS).map(([affiliateAbbr, label]) => (
      <StyledLi key={affiliateAbbr}>
        <a href={links.long[affiliateAbbr]}>
          <StyledArrowIcon />
          {label}
        </a>
      </StyledLi>
    ))}
  </StyledOl>
)

export default BookAffiliates
