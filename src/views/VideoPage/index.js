import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import { normalizeArray, normalizeItem } from 'utils/graphql/normalize'
import { formatBookDetails } from 'utils/transformers/text'
import Layout from 'Layout'

const VideoPage = ({ location, data: { videoData, mentionedBookData } }) => {
  const video = normalizeItem(videoData)
  const mentionedBooks = normalizeArray(mentionedBookData)

  return (
    <Layout>
      <h2>{video.title}</h2>

      <Img
        key={video.image.childImageSharp.fluid.src}
        fluid={video.image.childImageSharp.fluid}
      />

      {mentionedBooks.length && (
        <ol>
          {mentionedBooks.map((book) => (
            <li key={book.id}>
              <Link to={book.slug}>{formatBookDetails(book)}</Link>
            </li>
          ))}
        </ol>
      )}
    </Layout>
  )
}

export const query = graphql`
  query VideoPage($slug: String!, $bookSlugs: [String!]!) {
    videoData: videos(fields: { slug: { eq: $slug } }) {
      ...VideoFields
    }
    mentionedBookData: allMarkdownRemark(
      filter: { fields: { slug: { in: $bookSlugs } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            author
          }
        }
      }
    }
  }
`

export default VideoPage
