import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import { PageProps } from 'types/page'
import { RawBook, Book } from 'types/book'
import { RawVideoSnapshot, VideoSnapshot } from 'types/video/snapshot'
import { normalizeItem, normalizeArray } from 'utils/graphql/normalize'
import Layout from 'Layout'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import VideoCard from 'components/cards/VideoCard'
import { screen, screenMin } from 'styles/responsive'
import { GAP, toVW } from 'styles/layout'
import { formatTimestamp } from 'utils/formatting/time'

import BookTitle from './BookTitle'
import BookImage from './BookImage'
import BookReview from './BookReview'
import BookMeta from './BookMeta'
import BookAffiliates from './BookAffiliates'
import { VideoCardType } from 'types/video/card'
import { BookCardType, RawBookCard } from 'types/book/card'
import RelatedBooks from 'components/RelatedBooks'

const StyledMeta = styled.aside`
  ${screenMin.l`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${toVW(GAP.L)};
  `}

  ${screen.xl`
    grid-gap: ${toVW(GAP.XL)};
  `}
`

const StyledBookTitle = styled.div`
  align-self: end;
`

interface Props extends PageProps {
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
    relatedbooksData: {
      edges: {
        node: RawBookCard
      }[]
    }
  }
}

const BookPage: React.FC<Props> = ({
  data: { bookData, timestampMentionData, featuredVideoData },
  location,
}) => {
  const book = normalizeItem(bookData) as Book
  const timestampMentions = normalizeArray(
    timestampMentionData
  ) as VideoSnapshot[]
  const featuredVideos = normalizeArray(featuredVideoData) as VideoSnapshot[]
  const relatedBooks = book.relatedBooks.map(normalizeItem) as BookCardType[]

  return (
    <Layout location={location}>
      <Grid full>
        <GridItem
          as={StyledBookTitle}
          rows="2/3"
          rowsFromM="1/2"
          columnsFromM="7 / 12"
          columnsFromL="8 / 14"
          columnsFromXL="9 / 15"
        >
          <BookTitle
            title={book.title}
            author={book.author}
            rating7={book.rating7}
          />
        </GridItem>

        <GridItem columnsFromM="1/7" columnsFromL="1/8" columnsFromXL="1/9">
          <BookImage image={book.image} bookHeight={book.bookHeight} />
        </GridItem>

        <GridItem
          as={StyledMeta}
          spanFromM={4}
          columnsFromL="2/8"
          columnsFromXL="3/9"
          spanRowsFromM={
            2 +
            Math.ceil((timestampMentions.length + featuredVideos.length) / 2)
          }
        >
          <BookMeta
            pageCount={book.pageCount}
            dateBookPublished={book.dateBookPublished}
            publisher={book.publisher}
            tags={book.tags}
            readDates={book.readDates}
            dateRated={book.dateRated}
            dateReviewed={book.dateReviewed}
          />

          <BookAffiliates links={book.links} />
        </GridItem>

        <GridItem columnsFromM="5/13" columnsFromL="8/15" columnsFromXL="9/15">
          <BookReview summary={book.summary} html={book.html} />
        </GridItem>

        {featuredVideos.map((video) => (
          <GridItem
            key={video.id}
            span={1}
            spanFromM={4}
            spanFromL={3}
            spanFromXL={4}
          >
            <VideoCard video={video as VideoCardType} big playsInline />
          </GridItem>
        ))}

        {timestampMentions.map((mention) => {
          const timestamp = formatTimestamp(
            mention.timestamps.find((t) => t.book && t.book.id === book.id).t
          )

          return (
            <GridItem
              key={mention.id}
              span={1}
              spanFromM={4}
              spanFromL={3}
              spanFromXL={4}
            >
              <VideoCard
                video={mention as VideoCardType}
                timestamp={timestamp}
                big
                playsInline
              />
            </GridItem>
          )
        })}
      </Grid>

      <RelatedBooks books={relatedBooks} />
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
    featuredVideoData: allVideos(
      filter: { ownedBy: { id: { eq: $id } } }
      sort: { fields: datePublished, order: DESC }
    ) {
      edges {
        node {
          ...VideoSnapshotFields
        }
      }
    }
  }
`

export default BookPage
