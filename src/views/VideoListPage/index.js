import React from 'react'
import { graphql, Link } from 'gatsby'

import { normalizeArray } from 'utils/graphql/normalize'

const VideoListPage = ({ location, data: { videoData } }) => {
  const videos = normalizeArray(videoData)

  return (
    <>
      {videos.length && (
        <ol>
          {videos.map((video) => (
            <li key={video.id}>
              <Link to={video.slug}>{video.title}</Link>
            </li>
          ))}
        </ol>
      )}
    </>
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
