import React from 'react'
import { graphql } from 'gatsby'

import { normalizeArray } from 'utils/graphql/normalize'
import Layout from 'Layout'
import { RawVideoCard, VideoCardType } from 'types/video/card'
import VideoCard from 'components/cards/VideoCard'

interface Props {
  data: {
    videoData: {
      edges: {
        node: RawVideoCard
      }[]
    }
  }
}

const VideoListPage: React.FC<Props> = ({ data: { videoData } }) => {
  const videos = normalizeArray(videoData) as VideoCardType[]

  return (
    <Layout>
      {videos.length && (
        <ol>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ol>
      )}
    </Layout>
  )
}

export const query = graphql`
  query VideoListPage {
    videoData: allVideos(sort: { fields: datePublished }) {
      edges {
        node {
          ...VideoCardFields
        }
      }
    }
  }
`

export default VideoListPage
