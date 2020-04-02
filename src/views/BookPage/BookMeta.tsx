import React, { useState } from 'react'
import styled from 'styled-components'

import { Book } from 'types/book'
import { shortFormatDate, formatYear } from 'utils/formatting/time'
import useWindowSize from 'utils/hooks/useWindowSize'
import { FONT, BREAKPOINT } from 'styles/tokens'
import { trim } from 'styles/helpers'
import { screen, screenMin } from 'styles/responsive'
import Reveal from 'components/Reveal'
import RevealTrigger from 'components/Reveal/RevealTrigger'
import TagsList from './TagsList'

const META_ARIA_ID = 'book-meta'

const StyledRevealTrigger = styled(RevealTrigger)`
  ${screenMin.m`
    display: none;
  `}
  margin-bottom: 0.5em;
`

const StyledReveal = styled.dl`
  ${trim}

  ${screen.s`
    padding: 0.5em 0 0.5em 1em;
  `}
`

const StyledDt = styled.dt`
  font-size: ${FONT.SIZE.S};
  font-weight: ${FONT.WEIGHT.BOLD};
  margin: 0.5em 0 0;

  ${screenMin.m`
    margin: 1em 0 0;
  `}
`

const StyledDd = styled.dd`
  font-size: ${FONT.SIZE.S};
  margin: 0;
`

type Props = Pick<
  Book,
  | 'pageCount'
  | 'dateBookPublished'
  | 'publisher'
  | 'tags'
  | 'readDates'
  | 'dateRated'
  | 'dateReviewed'
>

const BookMeta: React.FC<Props> = ({
  pageCount,
  dateBookPublished,
  publisher,
  tags,
  readDates,
  dateRated,
  dateReviewed,
}) => {
  const { width: windowWidth } = useWindowSize()
  const [isOpen, setIsOpen] = useState(false)
  const dateRead = readDates.length > 0 && readDates[readDates.length - 1][1]

  return (
    <>
      <StyledRevealTrigger
        onClick={(): void => setIsOpen(!isOpen)}
        open={isOpen}
        ariaId={META_ARIA_ID}
      >
        Book information
      </StyledRevealTrigger>

      <Reveal
        as={StyledReveal}
        open={(windowWidth && windowWidth > BREAKPOINT.S) || isOpen}
        ariaId={META_ARIA_ID}
      >
        {pageCount && (
          <>
            <StyledDt>Page count</StyledDt>
            <StyledDd>{pageCount}</StyledDd>
          </>
        )}
        {dateBookPublished && (
          <>
            <StyledDt>Year published</StyledDt>
            <StyledDd>{formatYear(dateBookPublished)}</StyledDd>
          </>
        )}
        {publisher && (
          <>
            <StyledDt>Publisher</StyledDt>
            <StyledDd>{publisher}</StyledDd>
          </>
        )}

        <TagsList tags={tags} />

        <StyledDt>History</StyledDt>
        {dateRead && (
          <StyledDd>
            Read on{' '}
            <time dateTime={dateRead.toString()}>
              {shortFormatDate(dateRead)}
            </time>
          </StyledDd>
        )}
        {dateRated && (
          <StyledDd>
            Rated on {}
            <time dateTime={dateRated.toString()}>
              {shortFormatDate(dateRated)}
            </time>
          </StyledDd>
        )}
        {dateReviewed && (
          <StyledDd>
            Reviewed on {}
            <time dateTime={dateReviewed.toString()}>
              {shortFormatDate(dateReviewed)}
            </time>
          </StyledDd>
        )}
      </Reveal>
    </>
  )
}

export default BookMeta
