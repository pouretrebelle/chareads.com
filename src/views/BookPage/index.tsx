import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import { PageProps } from 'types/page'
import { Book, BookCardType } from 'types/book'
import { VideoSnapshot, VideoCardType } from 'types/video'
import { normalizeArray } from 'utils/graphql/normalize'
import { stripHtml } from 'utils/formatting/text'
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
import BookAffiliates from '../../components/BookAffiliates'

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
  const videos = [
    ...normalizeArray(featuredVideoData),
    ...normalizeArray(timestampMentionData),
  ] as VideoSnapshot[]
  const singleVideo = videos.length === 1

  const relatedBooks = book.relatedBooks as BookCardType[]
  const blockRowsForLeftColumn = 2 + Math.ceil(videos.length / 2)

  return (
    <Layout
      location={location}
      navTitle="Back to book reviews"
      navTitleLink={PATHS.BOOKS}
      title={`${book.title} by ${book.author}`}
      description={stripHtml(book.html) || book.summary}
      shareImage={`${book.slug}/share.jpg`}
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
            subtitle={book.subtitle}
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
            series={book.series}
            readDates={book.readDates}
            dateLastRead={book.dateLastRead}
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
          style={{ marginBottom: '1em' }}
        >
          <BookAffiliates links={book.links} />
        </GridItem>

        <GridItem columnsFromM="5/13" columnsFromL="8/15" columnsFromXL="9/15">
          <BookReview summary={book.summary} html={book.html} />
        </GridItem>

        {videos.map((video) => {
          const foundTimestamp = (video.timestamps || []).find(
            (t) => t.book && t.book.id === book.id
          )
          const timestamp = foundTimestamp && formatTimestamp(foundTimestamp.t)

          return (
            <GridItem
              key={video.id}
              span={singleVideo ? 2 : 1}
              spanFromM={singleVideo ? 8 : 4}
              spanFromL={singleVideo ? 6 : 3}
              spanFromXL={singleVideo ? 6 : 4}
            >
              <VideoCard
                video={video as VideoCardType}
                timestamp={timestamp}
                big
                playsInline
                hideOwnedByRating
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
