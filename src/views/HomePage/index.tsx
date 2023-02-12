import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { normalizeArray } from 'utils/graphql/normalize'
import PATHS from 'routes/paths'
import Layout from 'Layout'
import { PageProps } from 'types/page'
import { BookCardType } from 'types/book'
import { VideoCardType } from 'types/video'
import { ImageType } from 'types/images'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import BookCard from 'components/cards/BookCard'
import VideoCard from 'components/cards/VideoCard'
import Wrapper from 'components/Wrapper'
import YouTubeSubscribeButton from 'components/YouTubeSubscribeButton'
import { screen, screenMin } from 'styles/responsive'
import { COLOR } from 'styles/tokens'

import Hero from './Hero'
import SectionLink from './SectionLink'

const StyledMainWrapper = styled.div`
  background: ${COLOR.BACKGROUND};
  position: relative;
  z-index: 90;
`

const StyledIntroGrid = styled(Grid)`
  && {
    padding-top: 2em;
    margin-bottom: 2em;

    ${screenMin.l`
      padding-top: 3em;
      margin-bottom: 3em;
    `}
  }
`

const StyledSubscribeWrapper = styled(GridItem)`
  ${screenMin.l`
    align-self: end;
    text-align: right;
  `}
`

const StyledMediaGrid = styled(Grid)`
  ${screen.m`
    > *:nth-last-child(-n+2) {
      display: none;
    }
  `}
`

const StyledVideoCard = styled(VideoCard)`
  > div:last-child {
    min-height: auto;
  }
`

const StyledBookCard = styled(BookCard)`
  font-size: 0.875em;
`

const StyledLinkWrapper = styled(Wrapper)`
  && {
    margin-top: 2em;
  }
`

interface Props extends PageProps {
  data: {
    bookData: {
      edges: {
        node: BookCardType
      }[]
    }
    videoData: {
      edges: {
        node: VideoCardType
      }[]
    }
    cover: ImageType
  }
}

const HomePage: React.FC<Props> = ({
  data: { bookData, videoData, cover },
  location,
}) => {
  const books = normalizeArray(bookData) as BookCardType[]
  const videos = normalizeArray(videoData) as VideoCardType[]

  return (
    <Layout location={location} navOpenOnDesktop navInverted>
      <Hero cover={cover} />

      <StyledMainWrapper>
        <StyledIntroGrid>
          <StyledSubscribeWrapper spanFromL={4} columnsFromL="9 / 13">
            <YouTubeSubscribeButton />
          </StyledSubscribeWrapper>

          <GridItem span={2} spanFromM={12} spanFromL={8}>
            <p>
              Hello, I&rsquo;m Charlotte and I love to read anything and
              everything. Chareads is where I record and review every book I
              read. Have&nbsp;a&nbsp;poke around and find your next favourite.
            </p>
          </GridItem>
        </StyledIntroGrid>

        <StyledMediaGrid as="ol">
          {videos.length &&
            videos.map((video, i) => (
              <GridItem
                as="li"
                key={video.id}
                span={2}
                spanFromM={6}
                spanFromL={4}
                style={{ order: 2 + i * 2 }}
              >
                <StyledVideoCard video={video} big />
              </GridItem>
            ))}
          {books.length &&
            books.map((book, i) => (
              <GridItem
                as="li"
                key={book.id}
                span={1}
                spanFromM={3}
                spanFromL={2}
                style={{ order: i }}
              >
                <StyledBookCard book={book} featured={book.rating7 >= 6} />
              </GridItem>
            ))}
        </StyledMediaGrid>

        <StyledLinkWrapper>
          <SectionLink to={PATHS.BOOKS}>Find more book reviews</SectionLink>
          <SectionLink to={PATHS.VIDEOS}>See all my bookish videos</SectionLink>
        </StyledLinkWrapper>
      </StyledMainWrapper>
    </Layout>
  )
}

export const query = graphql`
  query HomePage {
    cover: file(relativePath: { eq: "cover.jpg" }) {
      publicURL
      childImageColors {
        darkMuted
        muted
      }
    }
    bookData: allBook(
      sort: { dateRated: DESC }
      filter: { rating7: { ne: null }, dateReviewed: { ne: null } }
      limit: 10
    ) {
      edges {
        node {
          ...BookCardFields
        }
      }
    }
    videoData: allVideo(
      sort: { datePublished: DESC }
      filter: { book: { id: { eq: null } } }
      limit: 4
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
