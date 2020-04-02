import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import { PageProps } from 'types/page'
import { Book, BookCardType } from 'types/book'
import { VideoSnapshot, VideoCardType } from 'types/video'
import { normalizeArray } from 'utils/graphql/normalize'
import PATHS from 'routes/paths'
import Layout from 'Layout'
import { screen, screenMin } from 'styles/responsive'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import VideoCard from 'components/cards/VideoCard'
import RelatedBooks from 'components/RelatedBooks'
import { formatTimestamp } from 'utils/formatting/time'

import BookTitle from './BookTitle'
import BookImage from './BookImage'
import BookReview from './BookReview'
import BookMeta from './BookMeta'
import BookAffiliates from './BookAffiliates'

const StyledBookTitle = styled.div`
  align-self: end;
`

const StyledHeadlineGridItem = styled(GridItem)`
  ${screen.m`
    margin-bottom: 0.5em;
  `}
  ${screenMin.l`
    margin-bottom: 1em;
  `}
`

interface Props extends PageProps {
  data: {
    book: Book
    timestampMentionData: {
      edges: {
        node: VideoSnapshot
      }[]
    }
    featuredVideoData: {
      edges: {
        node: VideoSnapshot
      }[]
    }
    relatedbooksData: {
      edges: {
        node: BookCardType
      }[]
    }
  }
}

const BookPage: React.FC<Props> = ({
  data: { book, timestampMentionData, featuredVideoData },
  location,
}) => {
  const timestampMentions = normalizeArray(
    timestampMentionData
  ) as VideoSnapshot[]
  const featuredVideos = normalizeArray(featuredVideoData) as VideoSnapshot[]
  const relatedBooks = book.relatedBooks as BookCardType[]
  const blockRowsForLeftColumn =
    2 + Math.ceil((timestampMentions.length + featuredVideos.length) / 2)

  return (
    <Layout
      location={location}
      navTitle="Back to book reviews"
      navTitleLink={PATHS.BOOKS}
    >
      <Grid full>
        <StyledHeadlineGridItem
          as={StyledBookTitle}
          rows="2/3"
          rowsFromM="1/2"
          columnsFromM="5 / 12"
          columnsFromL="8 / 14"
          columnsFromXL="9 / 15"
        >
          <BookTitle
            title={book.title}
            author={book.author}
            rating7={book.rating7}
          />
        </StyledHeadlineGridItem>

        <StyledHeadlineGridItem
          columnsFromM="1/5"
          columnsFromL="1/8"
          columnsFromXL="1/9"
        >
          <BookImage image={book.image} bookHeight={book.bookHeight} />
        </StyledHeadlineGridItem>

        <GridItem
          spanFromM={4}
          spanFromL={3}
          columnsFromL="2/5"
          columnsFromXL="3/6"
          spanRowsFromM={blockRowsForLeftColumn + 1}
          spanRowsFromL={blockRowsForLeftColumn}
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
        </GridItem>

        <GridItem
          spanFromM={8}
          spanFromL={3}
          columnsFromM="5/13"
          columnsFromL="5/8"
          columnsFromXL="6/9"
          rows="5"
          rowsFromM="3"
          rowsFromL={`2/${blockRowsForLeftColumn + 2}`}
        >
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
    book: book(id: { eq: $id }) {
      ...BookFields
    }
    timestampMentionData: allVideo(
      filter: { timestamps: { elemMatch: { book: { id: { eq: $id } } } } }
    ) {
      edges {
        node {
          ...VideoSnapshotFields
        }
      }
    }
    featuredVideoData: allVideo(
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
