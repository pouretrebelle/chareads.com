import React from 'react'
import { graphql } from 'gatsby'

import { RawBook, Book } from 'types/book'
import { RawVideoSnapshot, VideoSnapshot } from 'types/video/snapshot'
import { normalizeItem, normalizeArray } from 'utils/graphql/normalize'
import Layout from 'Layout'
import Grid from 'components/Grid'

import BookTitle from './BookTitle'
import BookImage from './BookImage'
import BookReview from './BookReview'
import BookMeta from './BookMeta'
import BookAffiliates from './BookAffiliates'

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
      <Grid full>
        <BookTitle
          title={book.title}
          author={book.author}
          rating7={book.rating7}
        />

        <BookImage image={book.image} />

        <BookMeta
          pageCount={book.pageCount}
          dateBookPublished={book.dateBookPublished}
          tags={book.tags}
          readDates={book.readDates}
          dateRated={book.dateRated}
          dateReviewed={book.dateReviewed}
        />

        <BookAffiliates links={book.links} />

        <BookReview
          summary={book.summary}
          html={book.html}
          timestampMentions={timestampMentions}
          featuredVideos={featuredVideos}
          bookId={book.id}
        />
      </Grid>
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
