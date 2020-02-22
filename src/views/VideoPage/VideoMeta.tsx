import React from 'react'
import styled from 'styled-components'

import { Video } from 'types/video'
import { FONT } from 'styles/tokens'
import { formatDate } from 'utils/formatting/time'

const StyledDt = styled.dt`
  font-size: ${FONT.SIZE.S};
  font-weight: ${FONT.WEIGHT.BOLD};
`

const StyledDd = styled.dd`
  font-size: ${FONT.SIZE.S};
  margin: 0 0 1em;
`

type Props = Pick<Video, 'datePublished'>

const VideoMeta: React.FC<Props> = ({ datePublished }) => (
  <dl>
    <StyledDt>Date posted</StyledDt>
    <StyledDd>
      <time>{formatDate(datePublished)}</time>
    </StyledDd>

    <StyledDt>Views</StyledDt>
    <StyledDd>5263</StyledDd>
  </dl>
)

export default VideoMeta
