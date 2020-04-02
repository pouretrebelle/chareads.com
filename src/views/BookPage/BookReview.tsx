import React, { useState } from 'react'
import styled from 'styled-components'

import { Book } from 'types/book'
import Reveal from 'components/Reveal'
import RevealTriggerWithArrow from 'components/Reveal/RevealTriggerWithArrow'
import { FONT } from 'styles/tokens'

const SUMMARY_ARIA_ID = 'book-summary'

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

      <RevealTriggerWithArrow
        onClick={(): void => setisSummaryOpen(!isSummaryOpen)}
        open={isSummaryOpen}
        ariaId={SUMMARY_ARIA_ID}
      >
        Show book summary
      </RevealTriggerWithArrow>

      <Reveal open={isSummaryOpen} ariaId={SUMMARY_ARIA_ID}>
        <StyledSummary>{summary}</StyledSummary>
      </Reveal>
    </StyledBookReview>
  )
}

export default BookReview
