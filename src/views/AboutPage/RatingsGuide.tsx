import React from 'react'
import styled from 'styled-components'

import H from 'components/H'
import StarRating from 'components/StarRating'
import { COLOR, FONT } from 'styles/tokens'
import { screen } from 'styles/responsive'
import { trim } from 'styles/helpers'

const captions = [
  'rubbish',
  'meh',
  'good',
  'very good',
  'great',
  'marvelous',
  'phenomenal',
]

const StyledRatingsGuide = styled.aside`
  ${trim}
  margin: 2em 0 0;
  padding: 1em;
  background: ${COLOR.BACKGROUND_DARK};
  font-size: ${FONT.SIZE.S};
`

const verticalRating = `
  flex-direction: column-reverse;
  margin-bottom: 0.5em;
`

const StyledRating = styled.li`
  display: flex;
  ${screen.m`${verticalRating}`}
  ${screen.l`${verticalRating}`}
`

const StyledStarRating = styled(StarRating)`
  display: inline-block;
  margin-right: 1em;
`

const RatingsGuide: React.FC = () => (
  <StyledRatingsGuide>
    <H size="M">
      A little ratings guide {}
      <abbr title="Rating inflation has made it difficult to differentiate the books at the top, so instead of cruelly marking books down to achieve a more standardised scale, I just added two extra stars">
        *
      </abbr>
    </H>
    <ol>
      {captions.map((caption, i) => (
        <StyledRating key={caption}>
          <StyledStarRating of7={i + 1} />
          <span>{caption}</span>
        </StyledRating>
      ))}
    </ol>
  </StyledRatingsGuide>
)

export default RatingsGuide
