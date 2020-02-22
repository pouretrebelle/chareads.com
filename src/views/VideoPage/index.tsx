import React, { useRef, useState } from 'react'
import { graphql, Link } from 'gatsby'

import { normalizeItem } from 'utils/graphql/normalize'
import Layout from 'Layout'
import { RawVideo, Video } from 'types/video'
import { Timestamp } from 'types/timestamp'
import { formatTimestamp, formatDate } from 'utils/formatting/time'
import StarRating from 'components/StarRating'

import VideoPlayer from './VideoPlayer'

interface Props {
  data: {
    videoData: RawVideo
  }
}

const VideoPage: React.FC<Props> = ({ data: { videoData } }) => {
  const timestamps = (videoData.timestamps || []).map(({ t, text, book }) => ({
    t,
    text,
    book: book && normalizeItem(book),
  })) as Timestamp[]
  const video = normalizeItem(videoData) as Video

  const [isPlaying, setIsPlaying] = useState(false)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const videoComponent = useRef()

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

  const ownedBook =
    video.ownedBy &&
    (normalizeItem(video.ownedBy) as { rating7?: number; slug: string })

  return (
    <Layout>
      <h2>{video.title}</h2>

      <VideoPlayer
        videoComponent={videoComponent}
        youtubeId={video.youtubeId}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setPlayedSeconds={setPlayedSeconds}
      />

      <time>{formatDate(video.datePublished)}</time>
      <p>{video.description}</p>

      {video.quote && <blockquote>{video.quote}</blockquote>}

      {ownedBook && (
        <p>
          <StarRating of7={ownedBook.rating7} />
          <Link to={ownedBook.slug}>go to book page</Link>
        </p>
      )}

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
            {book && (
              <p>
                <StarRating of7={book.rating7} />
                <Link to={book.slug}>go to book page</Link>
              </p>
            )}
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
