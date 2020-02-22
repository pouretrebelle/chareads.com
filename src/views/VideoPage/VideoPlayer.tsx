import React, { useState, useEffect } from 'react'
import YouTubePlayer from 'react-player/lib/players/YouTube'

import { Video } from 'types/video'
import { unformatTimestamp } from 'utils/formatting/time'
import getQueryParameters from 'utils/urls/getQueryParameters'
import AspectRatioWrapper from 'components/AspectRatioWrapper'

const YouTubePlayerConfig = {
  youtube: {
    playerVars: {
      rel: 0,
      controls: 1,
    },
  },
}

type VideoProps = Pick<Video, 'youtubeId'>

interface Props extends VideoProps {
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  setPlayedSeconds: React.Dispatch<React.SetStateAction<number>>
  videoComponent: React.MutableRefObject<undefined>
  backgroundColor: string
}

const VideoPlayer: React.FC<Props> = ({
  youtubeId,
  isPlaying,
  setIsPlaying,
  setPlayedSeconds,
  videoComponent,
  backgroundColor,
}) => {
  const [startAtSeconds, setStartAtSeconds] = useState(0)

  useEffect((): void => {
    const params = getQueryParameters()
    if (params.at) {
      const startAt = unformatTimestamp(params.at as string)
      setStartAtSeconds(startAt)
      setPlayedSeconds(startAt)
    }
  }, [])

  return (
    <AspectRatioWrapper style={{ backgroundColor }}>
      <YouTubePlayer
        url={`https://www.youtube.com/watch?v=${youtubeId}${startAtSeconds >
          0 && `&t=${startAtSeconds}`}`}
        ref={videoComponent}
        onPlay={(): void => setIsPlaying(true)}
        onPause={(): void => setIsPlaying(false)}
        onProgress={({ playedSeconds }): void =>
          setPlayedSeconds(playedSeconds)
        }
        progressInterval={500}
        playing={isPlaying}
        config={YouTubePlayerConfig}
        controls
        width="100%"
        height="100%"
      />
    </AspectRatioWrapper>
  )
}

export default VideoPlayer
