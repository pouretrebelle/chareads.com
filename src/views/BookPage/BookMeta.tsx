import React from 'react'
import styled from 'styled-components'

import { Book } from 'types/book'
import { shortFormatDate, formatYear } from 'utils/formatting/time'
import { FONT } from 'styles/tokens'
import TagsList from './TagsList'

const StyledDt = styled.dt`
  font-size: ${FONT.SIZE.S};
  font-weight: ${FONT.WEIGHT.BOLD};
`

const StyledDd = styled.dd`
  font-size: ${FONT.SIZE.S};
  margin: 0 0 1em;
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
}) => (
  <div>
    <dl>
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
  </div>
)

export default BookMeta
