import React from 'react'
import { graphql, Link } from 'gatsby'

import { normalizeArray } from 'utils/graphql/normalize'
import Layout from 'Layout'
import { RawVideoCard, VideoCard } from 'types/video'

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
  const videos = normalizeArray(videoData) as VideoCard[]

  return (
    <Layout>
      {videos.length && (
        <ol>
          {videos.map((video) => (
            <li key={video.id}>
              <Link to={video.slug}>{video.title}</Link>
            </li>
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