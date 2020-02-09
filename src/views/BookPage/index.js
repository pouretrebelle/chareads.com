import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import { normalizeArray, normalizeItem } from 'utils/graphql/normalize'
import Layout from 'Layout'
import H from 'components/H'

const BookPage = ({ location, data: { bookData, videoFeatureData } }) => {
  const book = normalizeItem(bookData)
  const videoFeatures = normalizeArray(videoFeatureData)

  return (
    <Layout>
      <H as="h2" size="L" decorative>
        {book.title}
      </H>
      <H as="h2" size="M">
        by {book.author}
      </H>

      <Img
        key={book.image.childImageSharp.fluid.src}
        fluid={book.image.childImageSharp.fluid}
      />

      {videoFeatures.length && (
        <ol>
          {videoFeatures.map((video) => (
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

export default BookPage