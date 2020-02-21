import React from 'react'
import { graphql, Link } from 'gatsby'

import { normalizeArray } from 'utils/graphql/normalize'
import PATHS from 'routes/paths'
import Layout from 'Layout'
import { RawBookCard, BookCardType } from 'types/book/card'
import { RawVideoCard, VideoCardType } from 'types/video/card'
import H from 'components/H'
import Wrapper from 'components/Wrapper'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import BookCard from 'components/cards/BookCard'
import VideoCard from 'components/cards/VideoCard'

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
  const videos = normalizeArray(videoData) as VideoCardType[]

  return (
    <Layout>
      <Wrapper>
        <H as="h2" size="L" decorative>
          <Link to={PATHS.VIDEOS}>Videos</Link>
        </H>
      </Wrapper>
      <Grid as="ol">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </Grid>

      <Wrapper>
        <H as="h2" size="L" decorative>
          <Link to={PATHS.BOOKS}>Books</Link>
        </H>
      </Wrapper>
      <Grid as="ol">
        {books.length &&
          books.map((book) => (
            <GridItem as="li" key={book.id} span={1} spanFromM={3}>
              <BookCard book={book} />
            </GridItem>
          ))}
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query HomePage {
    bookData: allMarkdownRemark(
      sort: { fields: frontmatter___dateRated, order: DESC }
      filter: { frontmatter: { rating7: { ne: null } } }
      limit: 4
    ) {
      edges {
        node {
          ...BookCardFields
        }
      }
    }
    videoData: allVideos(
      sort: { fields: datePublished, order: DESC }
      limit: 6
    ) {
      edges {
        node {
          ...VideoCardFields
        }
      }
    }
  }
`

export default HomePage
