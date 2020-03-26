import React, { useRef, useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { PageProps } from 'types/page'
import { normalizeItem } from 'utils/graphql/normalize'
import PATHS from 'routes/paths'
import Layout from 'Layout'
import { RawVideo, Video } from 'types/video'
import { BookCardType } from 'types/book/card'
import { BookSnapshot } from 'types/book/snapshot'
import H from 'components/H'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import BackLink from 'components/links/BackLink'
import RelatedBooks from 'components/RelatedBooks'
import { screen, screenMin } from 'styles/responsive'
import { FONT } from 'styles/tokens'
import { GAP, toVW } from 'styles/layout'

import VideoPlayer from './VideoPlayer'
import VideoTimestampList from './VideoTimestampList'
import VideoMeta from './VideoMeta'
import VideoOwnedBook from './VideoOwnedBook'

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

const StyledTitleWrapper = styled.div`
  ${screenMin.l`
    align-self: end;
  `}
`

const StyledTitle = styled(H)`
  margin: 0.5em 0 -0.2em;
`

const StyledBlockquote = styled.blockquote`
  position: relative;
  margin: 1.5em 0 1.5em 1.5em;

  &:before {
    content: '“';
    position: absolute;
    left: -0.5em;
    top: 0.25em;
    line-height: 0;
    font-size: 4em;
    font-family: ${FONT.FAMILY.DECORATIVE};
  }
`

interface Props extends PageProps {
  data: {
    videoData: RawVideo
  }
}

const VideoPage: React.FC<Props> = ({ data: { videoData }, location }) => {
  const video = normalizeItem(videoData) as Video

  const [isPlaying, setIsPlaying] = useState(false)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const videoComponent = useRef()

  const ownedBook = video.ownedBy as BookSnapshot
  const relatedBooks = video.relatedBooks as BookCardType[]

  const featuredRelatedBookSlugs = (video.timestamps || [])
    .filter((b) => b.book)
    .map((b) => b.book.slug)

  const flipLayout = ownedBook || !video.timestamps

  return (
    <Layout location={location}>
      <BackLink to={PATHS.VIDEOS}>Back to all videos</BackLink>

      <Grid full>
        <GridItem columnsFromL="1/8" columnsFromXL="1/9">
          <VideoPlayer
            videoComponent={videoComponent}
            youtubeId={video.youtubeId}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setPlayedSeconds={setPlayedSeconds}
            backgroundColor={video.image.colors.muted}
          />
        </GridItem>

        <GridItem
          as={StyledTitleWrapper}
          columnsFromM="5 / 13"
          columnsFromL="8 / 14"
          columnsFromXL="9 / 15"
          rows={flipLayout ? '2/3' : '3/4'}
          rowsFromL={flipLayout ? '1/2' : '2/3'}
        >
          {video.quote && <StyledBlockquote>{video.quote}</StyledBlockquote>}
          <StyledTitle as="h1" size="L">
            {video.title}
          </StyledTitle>
        </GridItem>

        <GridItem
          columnsFromM="5 / 13"
          columnsFromL="8/14"
          columnsFromXL="9/15"
        >
          {video.description}
        </GridItem>

        <GridItem
          as={StyledMeta}
          spanRows={3}
          spanRowsFromL={2}
          spanFromM={4}
          columnsFromL="2/8"
          columnsFromXL="3/9"
        >
          <VideoMeta
            datePublished={video.datePublished}
            viewCount={video.viewCount}
          />

          {ownedBook && (
            <VideoOwnedBook
              rating7={ownedBook.rating7}
              slug={ownedBook.slug}
              links={ownedBook.links}
            />
          )}
        </GridItem>

        {video.timestamps && (
          <GridItem
            columnsFromM="5 / 13"
            columnsFromL="8/15"
            columnsFromXL="9/17"
            rows={flipLayout ? '3/4' : '2/3'}
            rowsFromL={flipLayout ? '2/3' : '1/2'}
            style={{
              marginTop: flipLayout ? '0.625em' : '-0.5em',
              marginBottom: '-0.5em',
              alignSelf: flipLayout ? 'start' : 'end',
            }}
          >
            <VideoTimestampList
              timestamps={video.timestamps}
              playedSeconds={playedSeconds}
              setPlayedSeconds={setPlayedSeconds}
              setIsPlaying={setIsPlaying}
              videoComponent={videoComponent}
            />
          </GridItem>
        )}
      </Grid>

      <RelatedBooks
        books={relatedBooks}
        featuredSlugs={featuredRelatedBookSlugs}
        ownedSlug={ownedBook && ownedBook.slug}
      />
    </Layout>
  )
}

export const query = graphql`
  query VideoPage($id: String!) {
    videoData: videos(id: { eq: $id }) {
      ...VideoFields
    }
  }
`

export default VideoPage
