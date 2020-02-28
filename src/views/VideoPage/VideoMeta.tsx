import React from 'react'
import styled from 'styled-components'

import { Video } from 'types/video'
import { FONT } from 'styles/tokens'
import { formatDate } from 'utils/formatting/time'
import { formatNumberInThousands } from 'utils/formatting/numbers'

const StyledDt = styled.dt`
  font-size: ${FONT.SIZE.S};
  font-weight: ${FONT.WEIGHT.BOLD};
`

const StyledDd = styled.dd`
  font-size: ${FONT.SIZE.S};
  margin: 0 0 1em;
`

type Props = Pick<Video, 'datePublished' | 'viewCount'>

const VideoMeta: React.FC<Props> = ({ datePublished, viewCount }) => (
  <dl>
    <StyledDt>Date posted</StyledDt>
    <StyledDd>
      <time>{formatDate(datePublished)}</time>
    </StyledDd>

    <StyledDt>Views</StyledDt>
    <StyledDd>{formatNumberInThousands(viewCount)}</StyledDd>
  </dl>
)

export default VideoMeta
