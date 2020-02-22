import React, { useRef, useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { normalizeItem } from 'utils/graphql/normalize'
import Layout from 'Layout'
import { RawVideo, Video } from 'types/video'
import { BookFields } from 'types/book'
import H from 'components/H'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import { FONT } from 'styles/tokens'
import { screenMin } from 'styles/responsive'
import { toVW, getWidthOfColumns } from 'styles/layout'

import VideoPlayer from './VideoPlayer'
import VideoTimestampList from './VideoTimestampList'
import VideoMeta from './VideoMeta'
import VideoOwnedBook from './VideoOwnedBook'

const StyledTimestampWrapper = styled.aside`
  position: relative;
`

const StyledTitle = styled(H)`
  margin: 0 0 1em;

  ${screenMin.l`
    margin: 1em 0 0;
  `}

  ${screenMin.xl`
    max-width: ${toVW(getWidthOfColumns.xl(5))};
  `}
`

const StyledTimestampInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${screenMin.l`
    flex-direction: column-reverse;
    min-height: ${toVW((getWidthOfColumns.xl(9) * 9) / 16)};
  `}
`

const StyledBlockquote = styled.blockquote`
  position: relative;

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

interface Props {
  data: {
    videoData: RawVideo
  }
}

interface OwnedBy extends BookFields {
  rating7?: number
}

const VideoPage: React.FC<Props> = ({ data: { videoData } }) => {
  const video = normalizeItem(videoData) as Video

  const [isPlaying, setIsPlaying] = useState(false)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const videoComponent = useRef()

  const ownedBook = video.ownedBy && (normalizeItem(video.ownedBy) as OwnedBy)

  return (
    <Layout>
      <Grid full style={{ gridTemplateRows: 'auto 1fr' }}>
        <GridItem columnsFromL="1/9" columnsFromXL="1/10">
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
          as={StyledTimestampWrapper}
          rows="2/4"
          rowsFromL="1/3"
          columnsFromM="1 / 6"
          columnsFromL="9 / 15"
          columnsFromXL="10 / 17"
        >
          <StyledTimestampInner>
            <StyledTitle as="h1" size="L">
              {video.title}
            </StyledTitle>

            <VideoTimestampList
              timestampData={videoData.timestamps}
              playedSeconds={playedSeconds}
              setPlayedSeconds={setPlayedSeconds}
              setIsPlaying={setIsPlaying}
              videoComponent={videoComponent}
            />
          </StyledTimestampInner>
        </GridItem>

        <GridItem
          spanFromM={4}
          columnsFromM={ownedBook ? '10/13' : '6/10'}
          columnsFromL={ownedBook ? '12/15' : '9/12'}
          columnsFromXL={ownedBook ? '13/16' : '10/13'}
          rowsFromL="3/4"
        >
          <VideoMeta datePublished={video.datePublished} />
        </GridItem>

        {ownedBook && (
          <GridItem
            spanFromM={4}
            columnsFromM="6/10"
            columnsFromL="9/12"
            columnsFromXL="10/13"
            rowsFromL="3/4"
          >
            <VideoOwnedBook
              rating7={ownedBook.rating7}
              slug={ownedBook.slug}
              links={ownedBook.links}
            />
          </GridItem>
        )}

        <GridItem
          rowsFromL="2/4"
          columnsFromM="6/13"
          columnsFromL="2/9"
          columnsFromXL="3/10"
        >
          {video.quote && <StyledBlockquote>{video.quote}</StyledBlockquote>}

          <p>{video.description}</p>
        </GridItem>
      </Grid>
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
