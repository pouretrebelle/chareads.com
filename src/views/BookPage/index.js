import React from 'react'
import { graphql, Link } from 'gatsby'

import { normalizeArray, normalizeItem } from 'utils/graphql/normalize'

const VideoPage = ({ location, data: { bookData, videoFeatureData } }) => {
  const book = normalizeItem(bookData)
  const videoFeatures = normalizeArray(videoFeatureData)

  return (
    <>
      <h1>{book.title}</h1>

      {videoFeatures.length && (
        <ol>
          {videoFeatures.map((video) => (
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
  query BookPage($slug: String!, $videoFeatureSlugs: [String!]!) {
    bookData: markdownRemark(fields: { slug: { eq: $slug } }) {
      ...BookFields
    }
    videoFeatureData: allVideos(
      filter: { fields: { slug: { in: $videoFeatureSlugs } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          title
        }
      }
    }
  }
`

export default VideoPage
