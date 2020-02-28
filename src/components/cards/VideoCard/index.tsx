import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { VideoCardType } from 'types/video/card'
import { shortFormatDate } from 'utils/formatting/time'
import { formatViewCount } from 'utils/formatting/numbers'
import H from 'components/H'
import { COLOR, FONT, BORDER_RADIUS } from 'styles/tokens'

const StyledVideoCard = styled(Link)`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  overflow: hidden;
  background: ${COLOR.BACKGROUND_CARD};
  border-radius: ${BORDER_RADIUS.S};
`

const StyledImg = styled(Img)`
  box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.1);
`

const StyledDetails = styled.div`
  padding: 0.5em 0.5em 0.3em;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 4.8em;
`

const StyledTimestamp = styled.p`
  font-size: ${FONT.SIZE.S};
  margin: 0;
`

const StyledMeta = styled.p`
  display: flex;
  justify-content: space-between;
  font-size: ${FONT.SIZE.XS};
  margin: 0;
  opacity: 0.5;
`

const StyledH = styled(H)`
  margin: 0;
`

interface Props {
  video: VideoCardType
  featured?: boolean
  timestamp?: string
}

const VideoCard: React.FC<Props> = ({ video, featured, timestamp }) => (
  <StyledVideoCard
    to={timestamp ? `${video.slug}?at=${timestamp}` : video.slug}
    style={
      {
        background: featured && video.image.colors.lightVibrant,
        color: featured && video.image.colors.darkMuted,
        '--primary-color': video.image.colors.vibrant,
      } as object
    }
  >
    <StyledImg
      key={video.image.childImageSharp.fluid.src}
      fluid={video.image.childImageSharp.fluid}
      style={{ background: video.image.colors.muted }}
    />
    <StyledDetails>
      <div>
        {timestamp && (
          <StyledTimestamp>Featured at {timestamp} in</StyledTimestamp>
        )}
        <StyledH as="h2" size="S">
          {video.title}
        </StyledH>
      </div>
      <StyledMeta>
        <time>{shortFormatDate(video.datePublished)}</time>
        <span>{formatViewCount(video.viewCount)}</span>
      </StyledMeta>
    </StyledDetails>
  </StyledVideoCard>
)

export default VideoCard
