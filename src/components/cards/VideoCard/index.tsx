import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import YouTubePlayer from 'react-player/lib/players/YouTube'

import { VideoCardType } from 'types/video'
import {
  shortFormatDate,
  unformatTimestamp,
  formatTimestamp,
} from 'utils/formatting/time'
import { formatViewCount } from 'utils/formatting/numbers'
import H from 'components/H'
import { COLOR, FONT, BORDER_RADIUS, BREAKPOINT } from 'styles/tokens'
import StarRating from 'components/StarRating'
import AspectRatioWrapper from 'components/AspectRatioWrapper'
import PlayIcon from 'components/icons/PlayIcon'
import { HideOnPercy } from 'components/HideOnPercy'

const YouTubePlayerConfig = {
  youtube: {
    playerVars: {
      rel: 0,
      controls: 1,
      autoplay: 1,
    },
  },
}

const StyledVideoCard = styled(Link)`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  overflow: hidden;
  background: ${COLOR.BACKGROUND_DARK};
  border-radius: ${BORDER_RADIUS.S};
`

const StyledPlayButton = styled.button`
  position: absolute;
  z-index: 1;
  padding: 0.5em 0.6em;
  line-height: 0;
`

const StyledPlayIcon = styled(PlayIcon)`
  width: 1em;
  fill: ${COLOR.BACKGROUND_LIGHT};
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.1));
`

const StyledDuration = styled.aside`
  position: absolute;
  bottom: 0.25em;
  right: 0.25em;
  padding: 0 0.375em;
  border-radius: 2px;
  background: #00000088;
  color: #ffffffcc;
  font-size: ${({ $big }) => ($big ? FONT.SIZE.XS : FONT.SIZE.XXS)};
`

const StyledImg = styled(GatsbyImage)`
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
  font-size: ${({ isStars }): string =>
    isStars ? FONT.SIZE.XXS : FONT.SIZE.XS};
  margin: ${({ isStars }): number => (isStars ? 0.4 : 0.2)}em 0;
  opacity: 0.75;
`

interface Props {
  video: VideoCardType
  featured?: boolean
  timestamp?: string
  big?: boolean
  playsInline?: boolean
  hideOwnedByRating?: boolean
  className?: string
}

const VideoCard: React.FC<Props> = ({
  video,
  featured,
  timestamp,
  big,
  playsInline,
  hideOwnedByRating,
  className,
}) => {
  const [playVideo, setPlayVideo] = useState(false)
  const featuredBookCount =
    (video.timestamps || []).filter((t) => t.book && t.book.id).length +
    (video.ownedBy ? 1 : 0)

  return (
    <StyledVideoCard
      to={timestamp ? `${video.slug}?at=${timestamp}` : video.slug}
      style={
        {
          background: featured && video.image.childImageColors.lightVibrant,
          color: featured && video.image.childImageColors.darkMuted,
          '--primary-color': video.image.childImageColors.vibrant,
        } as object
      }
      className={className}
    >
      <AspectRatioWrapper
        style={{ backgroundColor: video.image.childImageColors.muted }}
      >
        {playVideo ? (
          <YouTubePlayer
            url={`https://www.youtube.com/watch?v=${video.youtubeId}${
              timestamp && `&t=${unformatTimestamp(timestamp)}`
            }`}
            config={YouTubePlayerConfig}
            width="100%"
            height="100%"
          />
        ) : (
          <div>
            {playsInline && (
              <StyledPlayButton
                onClick={(e): void => {
                  e.preventDefault()
                  setPlayVideo(true)
                }}
              >
                <StyledPlayIcon />
              </StyledPlayButton>
            )}
            <StyledImg
              image={
                big
                  ? video.image.childImageSharp.w400
                  : video.image.childImageSharp.w200
              }
              layout="fullWidth"
            />
            <StyledDuration $big={big} aria-label="duration">
              {formatTimestamp(video.duration)}
            </StyledDuration>
          </div>
        )}
      </AspectRatioWrapper>
      <StyledDetails>
        <div>
          {timestamp && (
            <StyledTimestamp>Featured at {timestamp} in</StyledTimestamp>
          )}
          <StyledH as="h2" size="S">
            {video.title}
          </StyledH>

          <StyledBookContentsWrapper isStars={!!video.ownedBy}>
            {video.ownedBy && !hideOwnedByRating
              ? video.ownedBy.rating7 && (
                  <StarRating of7={video.ownedBy.rating7} />
                )
              : !timestamp &&
                featuredBookCount > 1 && (
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
          <HideOnPercy>
            {video.viewCount >
              parseInt(process.env.GATSBY_YOUTUBE_VIEWS_MINIMUM_VISIBLE) && (
              <span>{formatViewCount(video.viewCount)}</span>
            )}
          </HideOnPercy>
        </StyledMeta>
      </StyledDetails>
    </StyledVideoCard>
  )
}

export default VideoCard
