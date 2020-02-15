import React, { useRef, useState, useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import YouTubePlayer from 'react-player/lib/players/YouTube'

import { normalizeItem } from 'utils/graphql/normalize'
import Layout from 'Layout'
import { RawVideo, Video } from 'types/video'
import { Timestamp } from 'types/timestamp'
import { formatTimestamp, unformatTimestamp } from 'utils/formatting/time'
import getQueryParameters from 'utils/urls/getQueryParameters'

const YouTubePlayerConfig = {
  youtube: {
    playerVars: {
      rel: 0,
      controls: 1,
    },
  },
}

interface Props {
  data: {
    videoData: RawVideo
  }
}

const VideoPage: React.FC<Props> = ({ data: { videoData } }) => {
  const timestamps = videoData.timestamps.map(({ t, text, book }) => ({
    t,
    text,
    book: book && normalizeItem(book),
  })) as Timestamp[]
  const video = normalizeItem(videoData) as Video

  const [isPlaying, setIsPlaying] = useState(false)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const [startAtSeconds, setStartAtSeconds] = useState(0)
  const videoComponent = useRef()

  useEffect((): void => {
    const params = getQueryParameters()
    if (params.at) {
      const startAt = unformatTimestamp(params.at as string)
      setStartAtSeconds(startAt)
      setPlayedSeconds(startAt)
    }
  }, [])

  const jumpToTimestamp = (t: number, startPlaying: boolean): void => {
    if (!videoComponent.current) return
    const target = videoComponent.current as { seekTo: (t: number) => {} }

    target.seekTo(t)
    setPlayedSeconds(t)
    if (startPlaying) setIsPlaying(true)
  }

  let segment: number
  timestamps.forEach(({ t }, i) => {
    if (playedSeconds >= t) segment = i
  })

  return (
    <Layout>
      <h2>{video.title}</h2>

      <Img
        key={video.image.childImageSharp.fluid.src}
        fluid={video.image.childImageSharp.fluid}
      />
      <YouTubePlayer
        url={`https://www.youtube.com/watch?v=${
          video.youtubeId
        }${startAtSeconds > 0 && `&t=${startAtSeconds}`}`}
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
      />

      <ol>
        {timestamps.map(({ t, text, book }, i) => (
          <li
            key={t}
            onClick={(): void => jumpToTimestamp(t, true)}
            style={
              segment === i
                ? {
                    background: 'thistle',
                  }
                : undefined
            }
          >
            {formatTimestamp(t)} - {text}
            {book && <Link to={book.slug}>go to page</Link>}
          </li>
        ))}
      </ol>
    </Layout>
  )
}

export const query = graphql`
  query VideoPage($id: String!) {
    videoData: videos(id: { eq: $id }) {
      ...VideoFields
    }
  }
`

export default VideoPage
