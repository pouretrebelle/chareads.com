import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import { normalizeArray, normalizeItem } from 'utils/graphql/normalize'
import { formatBookDetails } from 'utils/transformers/text'
import Layout from 'Layout'
import { RawVideo, Video } from 'types/video'

interface MentionedBookFrontmatter {
  title: string
  author: string
}
interface MentionedBookFields {
  slug: string
}
interface MentionedBookData {
  id: string
}
interface RawMentionedBook extends MentionedBookData {
  frontmatter: MentionedBookFrontmatter
  fields: MentionedBookFields
}
interface MentionedBook
  extends MentionedBookFrontmatter,
    MentionedBookFields,
    MentionedBookData {}

interface Props {
  data: {
    videoData: RawVideo
    mentionedBookData: {
      edges: {
        node: RawMentionedBook
      }[]
    }
  }
}

const VideoPage: React.FC<Props> = ({
  data: { videoData, mentionedBookData },
}) => {
  const video = normalizeItem(videoData) as Video
  const mentionedBooks = normalizeArray(mentionedBookData) as MentionedBook[]

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
