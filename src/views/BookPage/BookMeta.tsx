import React from 'react'
import styled from 'styled-components'

import { Book } from 'types/book'
import { shortFormatDate } from 'utils/formatting/time'
import { FONT } from 'styles/tokens'

const StyledBookMeta = styled.div`
  grid-column: 3 / 6;
`

const StyledDt = styled.dt`
  font-size: ${FONT.SIZE.S};
  font-weight: ${FONT.WEIGHT.BOLD};
`

const StyledDd = styled.dd`
  font-size: ${FONT.SIZE.S};
  margin: 0 0 1em;
`

const StyledOl = styled.ol`
  margin: 0;
  list-style: disc;
`

type Props = Pick<
  Book,
  | 'pageCount'
  | 'dateBookPublished'
  | 'tags'
  | 'readDates'
  | 'dateRated'
  | 'dateReviewed'
>

const BookMeta: React.FC<Props> = ({
  pageCount,
  dateBookPublished,
  tags,
  readDates,
  dateRated,
  dateReviewed,
}) => (
  <StyledBookMeta>
    <dl>
      <StyledDt>Page count</StyledDt>
      <StyledDd>{pageCount}</StyledDd>
      <StyledDt>Date published</StyledDt>
      <StyledDd>{shortFormatDate(dateBookPublished)}</StyledDd>

      {tags && tags.length === 0 ? null : (
        <>
          <StyledDt>Tags</StyledDt>
          <StyledDd>
            <StyledOl>
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </StyledOl>
          </StyledDd>
        </>
      )}
    </dl>

    <dl>
      <StyledDt>Date read</StyledDt>
      <StyledDd>{shortFormatDate(readDates[readDates.length - 1][1])}</StyledDd>
      <StyledDt>Date rated</StyledDt>
      <StyledDd>{shortFormatDate(dateRated)}</StyledDd>
      {dateReviewed && (
        <>
          <StyledDt>Date reviewed</StyledDt>
          <StyledDd>{shortFormatDate(dateReviewed)}</StyledDd>
        </>
      )}
    </dl>
  </StyledBookMeta>
)

export default BookMeta