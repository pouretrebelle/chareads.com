import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { FONT } from 'styles/tokens'
import StarRating from 'components/StarRating'
import ArrowIcon from 'components/icons/ArrowIcon'
import { Book } from 'types/book'
import BookAffiliates from 'views/BookPage/BookAffiliates'

const StyledAside = styled.aside`
  margin: 1em 0 0;
`

const StyledLink = styled(Link)`
  font-size: ${FONT.SIZE.S};
  font-weight: ${FONT.WEIGHT.BOLD};
`

const StyledStarRating = styled(StarRating)`
  font-size: ${FONT.SIZE.S};
`

type Props = Pick<Book, 'rating7' | 'slug' | 'links'>

const VideoOwnedBook: React.FC<Props> = ({ rating7, slug, links }) => (
  <StyledAside>
    <StyledStarRating of7={rating7} />
    <StyledLink to={slug}>
      Book page
      <ArrowIcon />
    </StyledLink>

    <BookAffiliates links={links} />
  </StyledAside>
)

export default VideoOwnedBook
