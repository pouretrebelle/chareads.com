import React, { useRef, useState } from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import YouTubePlayer from 'react-player/lib/players/YouTube'

import { normalizeItem } from 'utils/graphql/normalize'
import Layout from 'Layout'
import { RawVideo, Video } from 'types/video'
import { Timestamp } from 'types/timestamp'
import { formatTimestamp } from 'utils/formatting/timestamps'

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
  const videoComponent = useRef()

  const jumpToTimestamp = (t: number): void => {
    if (!videoComponent.current) return
    const target = videoComponent.current as { seekTo: (t: number) => {} }

    target.seekTo(t)
    setIsPlaying(true)
    setPlayedSeconds(t)
  }

  let segment
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
        url={`https://www.youtube.com/watch?v=${video.youtubeId}`}
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
            onClick={(): void => jumpToTimestamp(t)}
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
