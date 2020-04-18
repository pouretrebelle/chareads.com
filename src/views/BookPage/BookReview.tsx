import React, { useState } from 'react'
import styled from 'styled-components'

import { Book } from 'types/book'
import { FONT } from 'styles/tokens'
import { screenMin } from 'styles/responsive'
import MarkdownWrapper from 'components/MarkdownWrapper'
import Reveal from 'components/Reveal'
import RevealTrigger from 'components/Reveal/RevealTrigger'

const SUMMARY_ARIA_ID = 'book-summary'

const StyledBookReview = styled.div`
  position: relative;

  && {
    margin-top: -1em;
    ${screenMin.m`
      margin-top: -0.25em;
    `}
    ${screenMin.l`
      margin-bottom: 1em;
    `}
  }
`

const StyledContent = styled.div`
  margin: 0.5em 0 0.5em;

  ${screenMin.m`
    margin-bottom: 0 0 1em;
  `}
`

const StyledSummary = styled.div`
  padding: 0.5em 0 0;
  font-size: ${FONT.SIZE.S};
`

type Props = Pick<Book, 'summary' | 'html'>

const BookReview: React.FC<Props> = ({ summary, html }) => {
  const [isSummaryOpen, setisSummaryOpen] = useState(!html)

  return (
    <StyledBookReview>
      {html && (
        <StyledContent>
          <MarkdownWrapper dangerouslySetInnerHTML={{ __html: html }} />
        </StyledContent>
      )}

      <RevealTrigger
        onClick={(): void => setisSummaryOpen(!isSummaryOpen)}
        open={isSummaryOpen}
        ariaId={SUMMARY_ARIA_ID}
      >
        Book blurb
      </RevealTrigger>

      <Reveal as={StyledSummary} open={isSummaryOpen} ariaId={SUMMARY_ARIA_ID}>
        {summary}
      </Reveal>
    </StyledBookReview>
  )
}

export default BookReview
