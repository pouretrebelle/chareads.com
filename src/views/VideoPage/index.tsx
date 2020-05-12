import React, { useRef, useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { PageProps } from 'types/page'
import PATHS from 'routes/paths'
import Layout from 'Layout'
import { Video } from 'types/video'
import { BookCardType } from 'types/book'
import { BookSnapshot } from 'types/book'
import { stripHtml } from 'utils/formatting/text'
import H from 'components/H'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import RelatedBooks from 'components/RelatedBooks'
import MarkdownWrapper from 'components/MarkdownWrapper'
import { screen, screenMin, screenMax } from 'styles/responsive'
import { FONT } from 'styles/tokens'
import { GAP, toVW } from 'styles/layout'

import VideoPlayer from './VideoPlayer'
import VideoTimestampList from './VideoTimestampList'
import VideoMeta from './VideoMeta'
import VideoOwnedBook from './VideoOwnedBook'

// import YouTubeDescription from 'components/YouTubeDescription'

const StyledTimestampGridItem = styled(GridItem)`
  margin-top: 0.5em;

  ${screenMin.l`
    margin-bottom: -0.5em;
  `}
`

const StyledMeta = styled.aside`
  ${screenMin.m`
    margin-top: 1em;
  `}

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

  ${screenMax.m`
    display: none;
  `}

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
    video: Video
  }
}

const VideoPage: React.FC<Props> = ({ data: { video }, location }) => {
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
    <Layout
      location={location}
      navTitle="Back to all videos"
      navTitleLink={PATHS.VIDEOS}
      title={video.title}
      description={stripHtml(video.html)}
      shareImage={video.image.childImageSharp.share.src}
    >
      {/* <YouTubeDescription video={video} /> */}

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

        {video.html && (
          <GridItem
            columnsFromM="5 / 13"
            columnsFromL="8/14"
            columnsFromXL="9/15"
          >
            <MarkdownWrapper dangerouslySetInnerHTML={{ __html: video.html }} />
          </GridItem>
        )}

        <GridItem
          as={StyledMeta}
          spanRows={3}
          spanRowsFromL={video.html && video.timestamps ? 2 : 1}
          spanFromM={4}
          columnsFromL="2/8"
          columnsFromXL="3/9"
        >
          <VideoMeta
            datePublished={video.datePublished}
            viewCount={video.viewCount}
            commentCount={video.commentCount}
            youtubeId={video.youtubeId}
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
            as={StyledTimestampGridItem}
            columnsFromM="5 / 13"
            columnsFromL="8/15"
            columnsFromXL="9/17"
            rows={flipLayout ? '3/4' : '2/3'}
            rowsFromL={flipLayout ? '2/3' : '1/2'}
            style={{
              marginTop: flipLayout ? '-0.25em' : '-0.75em',
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
    video: video(id: { eq: $id }) {
      ...VideoFields
    }
  }
`

export default VideoPage
