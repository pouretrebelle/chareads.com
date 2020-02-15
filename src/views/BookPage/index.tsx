import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import { RawBook, Book } from 'types/book'
import { RawVideoSnapshot, VideoSnapshot } from 'types/video/snapshot'
import { normalizeItem, normalizeArray } from 'utils/graphql/normalize'
import Layout from 'Layout'
import H from 'components/H'

interface Props {
  data: {
    bookData: RawBook
    timestampMentionData: {
      edges: {
        node: RawVideoSnapshot
      }[]
    }
    featuredVideoData: {
      edges: {
        node: RawVideoSnapshot
      }[]
    }
  }
}

const BookPage: React.FC<Props> = ({
  data: { bookData, timestampMentionData, featuredVideoData },
}) => {
  const book = normalizeItem(bookData) as Book
  const timestampMentions = normalizeArray(
    timestampMentionData
  ) as VideoSnapshot[]
  const featuredVideos = normalizeArray(featuredVideoData) as VideoSnapshot[]

  return (
    <Layout>
      <H as="h2" size="L" decorative>
        {book.title}
      </H>
      <H as="h2" size="M">
        by {book.author}
      </H>

      <figure style={{ maxWidth: 200, margin: 0 }}>
        <Img
          key={book.image.childImageSharp.fluid.src}
          fluid={book.image.childImageSharp.fluid}
        />
      </figure>

      <dl>
        <dt>Page count</dt>
        <dd>{book.pageCount}</dd>
        <dt>ISBN</dt>
        <dd>{book.isbn13}</dd>
        <dt>Tags</dt>
        <dd>{book.tags.join(', ')}</dd>
      </dl>

      {book.summary && <p>{book.summary}</p>}

      {book.html && <div dangerouslySetInnerHTML={{ __html: book.html }} />}

      {featuredVideos.length > 0 && (
        <>
          <H as="h3" size="M">
            Featured video{featuredVideos.length > 1 && 's'}
          </H>
          <ol>
            {featuredVideos.map(({ title, slug, image }) => (
              <li key={slug}>
                <Link to={slug}>
                  {title}
                  <figure style={{ maxWidth: 200, margin: 0 }}>
                    <Img
                      key={image.childImageSharp.fluid.src}
                      fluid={image.childImageSharp.fluid}
                    />
                  </figure>
                </Link>
              </li>
            ))}
          </ol>
        </>
      )}

      {timestampMentions.length > 0 && (
        <>
          <H as="h3" size="M">
            Mentions in {featuredVideos.length > 0 && 'other '}videos
          </H>
          <ol>
            {timestampMentions.map(({ title, slug, image }) => (
              <li key={slug}>
                <Link to={slug}>
                  {title}
                  <figure style={{ maxWidth: 200, margin: 0 }}>
                    <Img
                      key={image.childImageSharp.fluid.src}
                      fluid={image.childImageSharp.fluid}
                    />
                  </figure>
                </Link>
              </li>
            ))}
          </ol>
        </>
      )}
    </Layout>
  )
}

export const query = graphql`
  query BookPage($id: String!) {
    bookData: markdownRemark(id: { eq: $id }) {
      ...BookFields
    }
    timestampMentionData: allVideos(
      filter: { timestamps: { elemMatch: { book: { id: { eq: $id } } } } }
    ) {
      edges {
        node {
          ...VideoSnapshotFields
        }
      }
    }
    featuredVideoData: allVideos(filter: { ownedBy: { id: { eq: $id } } }) {
      edges {
        node {
          ...VideoSnapshotFields
        }
      }
    }
  }
`

export default BookPage
