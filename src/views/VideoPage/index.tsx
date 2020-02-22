import React, { useRef, useState } from 'react'
import { graphql, Link } from 'gatsby'

import { normalizeItem } from 'utils/graphql/normalize'
import Layout from 'Layout'
import { RawVideo, Video } from 'types/video'
import { formatDate } from 'utils/formatting/time'
import StarRating from 'components/StarRating'

import VideoPlayer from './VideoPlayer'
import VideoTimestampList from './VideoTimestampList'

interface Props {
  data: {
    videoData: RawVideo
  }
}

const VideoPage: React.FC<Props> = ({ data: { videoData } }) => {
  const video = normalizeItem(videoData) as Video

  const [isPlaying, setIsPlaying] = useState(false)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const videoComponent = useRef()

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

      <VideoTimestampList
        timestampData={videoData.timestamps}
        playedSeconds={playedSeconds}
        setPlayedSeconds={setPlayedSeconds}
        setIsPlaying={setIsPlaying}
        videoComponent={videoComponent}
      />
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
