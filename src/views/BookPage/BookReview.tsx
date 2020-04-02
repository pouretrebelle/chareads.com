import React, { useState } from 'react'
import styled from 'styled-components'

import { Book } from 'types/book'
import { FONT } from 'styles/tokens'
import { trim } from 'styles/helpers'
import { screenMin } from 'styles/responsive'
import Reveal from 'components/Reveal'
import RevealTrigger from 'components/Reveal/RevealTrigger'

const SUMMARY_ARIA_ID = 'book-summary'

const StyledBookReview = styled.div`
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
  ${trim}
  margin: 0.5em 0 0.5em;
  ${screenMin.m`
    margin-bottom: 0 0 1em;
  `}

  p {
    margin: 0.5em 0;
  }
`

const StyledSummary = styled.div`
  padding: 0.5em 0 0;
  font-size: ${FONT.SIZE.S};
`

type Props = Pick<Book, 'summary' | 'html'>

const BookReview: React.FC<Props> = ({ summary, html }) => {
  const [isSummaryOpen, setisSummaryOpen] = useState(false)

  return (
    <StyledBookReview>
      {html && <StyledContent dangerouslySetInnerHTML={{ __html: html }} />}

      <RevealTrigger
        onClick={(): void => setisSummaryOpen(!isSummaryOpen)}
        open={isSummaryOpen}
        ariaId={SUMMARY_ARIA_ID}
      >
        Book summary
      </RevealTrigger>

      <Reveal as={StyledSummary} open={isSummaryOpen} ariaId={SUMMARY_ARIA_ID}>
        {summary}
      </Reveal>
    </StyledBookReview>
  )
}

export default BookReview
