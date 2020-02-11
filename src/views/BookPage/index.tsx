import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import { RawBook, Book } from 'types/book'
import { normalizeArray, normalizeItem } from 'utils/graphql/normalize'
import Layout from 'Layout'
import H from 'components/H'

interface VideoFeatureFields {
  slug: string
}
interface VideoFeatureData {
  id: string
  title: string
}
interface RawVideoFeature extends VideoFeatureData {
  fields: VideoFeatureFields
}
interface VideoFeature extends VideoFeatureFields, VideoFeatureData {}

interface Props {
  data: {
    bookData: RawBook
    videoFeatureData: {
      edges: {
        node: RawVideoFeature
      }[]
    }
  }
}

const BookPage: React.FC<Props> = ({
  data: { bookData, videoFeatureData },
}) => {
  const book = normalizeItem(bookData) as Book
  const videoFeatures = normalizeArray(videoFeatureData) as VideoFeature[]

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
