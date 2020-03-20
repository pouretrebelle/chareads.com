import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { Timestamp } from 'types/timestamp'
import { formatTimestamp } from 'utils/formatting/time'
import StarRating from 'components/StarRating'
import ArrowIcon from 'components/icons/ArrowIcon'
import { COLOR, FONT } from 'styles/tokens'

import BookAffiliates from '../BookPage/BookAffiliates'

const StyledVideoTimestamp = styled.li<Pick<Props, 'active'>>`
  padding: 0.25em 0.75em;
  display: flex;
  cursor: pointer;
  font-size: ${FONT.SIZE.S};

  ${({ active }): string => active && `background: ${COLOR.BACKGROUND_DARK};`}
`

const StyledTime = styled.time`
  min-width: 3ch;
  margin-right: 1ch;
`

const StyledDetails = styled.div`
  flex: 1;

  > * {
    margin: 0;
  }
`

const StyledText = styled.p`
  font-weight: ${FONT.WEIGHT.BOLD};
`

const StyledBook = styled.div<Pick<Props, 'active'>>`
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  max-height: 1em;

  ${({ active }): string => active && `max-height: 6em;`}
`

const StyledBookLink = styled(Link)`
  font-size: ${FONT.SIZE.S};

  + * {
    margin: 0 0 0.5em;
  }
`

interface Props extends Timestamp {
  jumpToTimestamp: (t: number, startPlaying: boolean) => void
  active: boolean
}

const VideoTimestamp: React.FC<Props> = ({
  t,
  text,
  book,
  active,
  jumpToTimestamp,
}) => (
  <StyledVideoTimestamp
    key={t}
    onClick={(e): void => {
      const element = e.target as HTMLElement
      if (element.tagName !== 'a') jumpToTimestamp(t, true)
    }}
    active={active}
  >
    <StyledTime>{formatTimestamp(t)}</StyledTime>
    <StyledDetails>
      <StyledText>{text}</StyledText>
      {book && (
        <StyledBook active={active}>
          <StarRating of7={book.rating7} />
          <StyledBookLink to={book.slug}>
            Book page&ensp;
            <ArrowIcon thin />
          </StyledBookLink>
          <BookAffiliates links={book.links} />
        </StyledBook>
      )}
    </StyledDetails>
  </StyledVideoTimestamp>
)

export default VideoTimestamp
