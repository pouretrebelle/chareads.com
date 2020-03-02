import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { VideoCardType } from 'types/video/card'
import { shortFormatDate } from 'utils/formatting/time'
import { formatViewCount } from 'utils/formatting/numbers'
import H from 'components/H'
import { COLOR, FONT, BORDER_RADIUS, BREAKPOINT } from 'styles/tokens'
import StarRating from 'components/StarRating'

const StyledVideoCard = styled(Link)`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  overflow: hidden;
  background: ${COLOR.BACKGROUND_DARK};
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
  flex-flow: wrap-reverse;
  font-size: ${FONT.SIZE.XS};
  margin: 0;
  opacity: 0.5;
`

const StyledDatePublished = styled.time`
  margin-right: 0.5em;
`

const StyledH = styled(H)`
  margin: 0;
`

interface BookContentsProps {
  isStars: boolean
}

const StyledBookContentsWrapper = styled.div<BookContentsProps>`
  font-size: ${({ isStars }): string => (isStars ? FONT.SIZE.S : FONT.SIZE.XS)};
  margin: ${({ isStars }): number => (isStars ? 0.4 : 0.2)}em 0;
  opacity: 0.75;
`

interface Props {
  video: VideoCardType
  featured?: boolean
  timestamp?: string
  big?: boolean
}

const VideoCard: React.FC<Props> = ({ video, featured, timestamp, big }) => {
  const featuredBookCount = (video.timestamps || []).filter(
    (t) => t.book && t.book.id
  ).length

  return (
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
        fluid={
          big
            ? [
                {
                  ...video.image.childImageSharp.w200,
                  media: `(max-width: ${BREAKPOINT.M - 1}px)`,
                },
                {
                  ...video.image.childImageSharp.w350,
                  media: `(min-width: ${BREAKPOINT.M}px)`,
                },
              ]
            : video.image.childImageSharp.w200
        }
        backgroundColor={video.image.colors.muted}
      />
      <StyledDetails>
        <div>
          {timestamp && (
            <StyledTimestamp>Featured at {timestamp} in</StyledTimestamp>
          )}
          <StyledH as="h2" size="S">
            {video.title}
          </StyledH>

          <StyledBookContentsWrapper isStars={!!video.ownedBy}>
            {video.ownedBy
              ? video.ownedBy.frontmatter.rating7 && (
                  <StarRating of7={video.ownedBy.frontmatter.rating7} />
                )
              : !timestamp &&
                featuredBookCount > 0 && (
                  <>
                    Featuring {featuredBookCount} book
                    {featuredBookCount > 1 && 's'}
                  </>
                )}
          </StyledBookContentsWrapper>
        </div>
        <StyledMeta>
          <StyledDatePublished>
            {shortFormatDate(video.datePublished)}
          </StyledDatePublished>
          <div>{formatViewCount(video.viewCount)}</div>
        </StyledMeta>
      </StyledDetails>
    </StyledVideoCard>
  )
}

export default VideoCard
