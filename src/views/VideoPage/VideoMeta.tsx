import React, { useState } from 'react'
import styled from 'styled-components'

import { Video } from 'types/video'
import { formatDate } from 'utils/formatting/time'
import { formatNumberInThousands } from 'utils/formatting/numbers'
import useWindowSize from 'utils/hooks/useWindowSize'
import { FONT, BREAKPOINT } from 'styles/tokens'
import { trim } from 'styles/helpers'
import { screen, screenMin } from 'styles/responsive'
import Reveal from 'components/Reveal'
import RevealTrigger from 'components/Reveal/RevealTrigger'

const META_ARIA_ID = 'book-meta'

const StyledAside = styled.aside`
  margin-bottom: 1em;
`

const StyledRevealTrigger = styled(RevealTrigger)`
  ${screenMin.m`
    display: none;
  `}
`

const StyledReveal = styled.dl`
  ${trim}

  ${screen.s`
    padding: 0.5em 0 0 1em;
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

type Props = Pick<Video, 'datePublished' | 'viewCount'>

const VideoMeta: React.FC<Props> = ({ datePublished, viewCount }) => {
  const { width: windowWidth } = useWindowSize()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <StyledAside>
      <StyledRevealTrigger
        onClick={(): void => setIsOpen(!isOpen)}
        open={isOpen}
        ariaId={META_ARIA_ID}
      >
        Video information
      </StyledRevealTrigger>

      <Reveal
        as={StyledReveal}
        open={(windowWidth && windowWidth > BREAKPOINT.S) || isOpen}
        ariaId={META_ARIA_ID}
      >
        <StyledDt>Date posted</StyledDt>
        <StyledDd>
          <time>{formatDate(datePublished)}</time>
        </StyledDd>

        <StyledDt>Views</StyledDt>
        <StyledDd>{formatNumberInThousands(viewCount)}</StyledDd>
      </Reveal>
    </StyledAside>
  )
}

export default VideoMeta
