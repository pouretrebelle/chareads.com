import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import { normalizeArray, normalizeItem } from 'utils/graphql/normalize'
import { formatBookDetails } from 'utils/transformers/text'

const VideoPage = ({ location, data: { videoData, mentionedBookData } }) => {
  const video = normalizeItem(videoData)
  const mentionedBooks = normalizeArray(mentionedBookData)

  return (
    <>
      <h1>{video.title}</h1>

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
    </>
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
