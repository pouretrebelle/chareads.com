import React from 'react'
import styled from 'styled-components'

import { Timestamp } from 'types/timestamp'
import { formatTimestamp } from 'utils/formatting/time'
import { COLOR, FONT } from 'styles/tokens'
import { trim } from 'styles/helpers'
import Link from 'components/links/Link'
import StarRating from 'components/StarRating'
import ArrowIcon from 'components/icons/ArrowIcon'
import Reveal from 'components/Reveal'
import BookAffiliates from 'components/BookAffiliates'

const StyledVideoTimestamp = styled.li<Pick<Props, 'active'>>`
  padding: 0.375em 0.75em;
  display: flex;
  cursor: pointer;
  font-size: ${FONT.SIZE.S};

  ${({ active }): string => active && `background: ${COLOR.BACKGROUND_DARK};`}
`

const StyledTime = styled.time`
  min-width: 4ch;
  margin-right: 1ch;
  line-height: 1.25;
`

const StyledDetails = styled.div`
  flex: 1;

  > * {
    margin: 0;
  }
`

const StyledText = styled.p`
  font-weight: ${FONT.WEIGHT.BOLD};
  line-height: 1.25;
`

const StyledBookLink = styled(Link)`
  display: block;
  width: max-content;
  font-size: ${FONT.SIZE.S};
`

const StyledStarRating = styled(StarRating)`
  display: inline-block;
  vertical-align: text-top;
`

const StyledReveal = styled(Reveal)`
  transition: max-height 200ms linear;
  ${trim}
`

interface Props extends Timestamp {
  jumpToTimestamp: (t: number, startPlaying: boolean) => void
  active: boolean
}

const VideoTimestamp: React.FC<Props> = ({
  t,
  text,
  link,
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
      <StyledText>
        {link ? (
          <Link href={link} as="a">
            {text}
            <ArrowIcon />
          </Link>
        ) : (
          text
        )}
      </StyledText>
      {book && (
        <>
          <StyledBookLink to={book.slug}>
            <StyledStarRating of7={book.rating7} />
            <ArrowIcon />
          </StyledBookLink>

          <StyledReveal open={active}>
            <BookAffiliates links={book.links} />
          </StyledReveal>
        </>
      )}
    </StyledDetails>
  </StyledVideoTimestamp>
)

export default VideoTimestamp
