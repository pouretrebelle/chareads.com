import React from 'react'
import { graphql, Link } from 'gatsby'

import { normalizeArray } from 'utils/graphql/normalize'
import PATHS from 'routes/paths'
import Layout from 'Layout'
import { RawBookCard, BookCardType } from 'types/book/card'
import { RawVideoCard, VideoCard } from 'types/video/card'
import BookCard from 'components/cards/BookCard'

interface Props {
  data: {
    bookData: {
      edges: {
        node: RawBookCard
      }[]
    }
    videoData: {
      edges: {
        node: RawVideoCard
      }[]
    }
  }
}

const HomePage: React.FC<Props> = ({ data: { bookData, videoData } }) => {
  const books = normalizeArray(bookData) as BookCardType[]
  const videos = normalizeArray(videoData) as VideoCard[]

  return (
    <Layout>
      <h2>
        <Link to={PATHS.VIDEOS}>Videos</Link>
      </h2>
      {videos.length && (
        <ol>
          {videos.map((video) => (
            <li key={video.id}>
              <Link to={video.slug}>{video.title}</Link>
            </li>
          ))}
        </ol>
      )}

      <h2>
        <Link to={PATHS.BOOKS}>Books</Link>
      </h2>
      {books.length && (
        <ol>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </ol>
      )}
    </Layout>
  )
}

export const query = graphql`
  query HomePage {
    bookData: allMarkdownRemark(
      sort: { fields: frontmatter___dateReviewed }
      limit: 5
    ) {
      edges {
        node {
          ...BookCardFields
        }
      }
    }
    videoData: allVideos(sort: { fields: datePublished }, limit: 5) {
      edges {
        node {
          ...VideoCardFields
        }
      }
    }
  }
`

export default HomePage
