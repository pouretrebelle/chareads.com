import React, { useState } from 'react'
import styled from 'styled-components'

import { Book } from 'types/book'
import Reveal from 'components/Reveal'
import ArrowIcon from 'components/icons/ArrowIcon'
import { FONT } from 'styles/tokens'

const SUMMARY_ARIA_ID = 'book-summary'

const StyledSummaryTrigger = styled.button`
  font-size: ${FONT.SIZE.S};
  font-weight: ${FONT.WEIGHT.BOLD};
`

interface ArrowProps {
  open: boolean
}

const StyledArrowIcon = styled(ArrowIcon)<ArrowProps>`
  transition: transform 0.2s linear;
  transform: rotate(${({ open }): number => (open ? 270 : 90)}deg);
  margin: 0 0.5em 0 0;
`

const StyledSummary = styled.div`
  font-size: ${FONT.SIZE.S};
`

const StyledBookReview = styled.div`
  margin-top: 1em;
`

type Props = Pick<Book, 'summary' | 'html'>

const BookReview: React.FC<Props> = ({ summary, html }) => {
  const [isSummaryOpen, setisSummaryOpen] = useState(false)

  return (
    <StyledBookReview>
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}

      <StyledSummaryTrigger
        onClick={(): void => setisSummaryOpen(!isSummaryOpen)}
        aria-expanded={isSummaryOpen}
        aria-controls={SUMMARY_ARIA_ID}
      >
        <StyledArrowIcon open={isSummaryOpen} />
        Show book summary
      </StyledSummaryTrigger>
      <Reveal open={isSummaryOpen} ariaId={SUMMARY_ARIA_ID}>
        <StyledSummary>{summary}</StyledSummary>
      </Reveal>
    </StyledBookReview>
  )
}

export default BookReview
