import React, { useRef, useState } from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import { normalizeItem } from 'utils/graphql/normalize'
import Layout from 'Layout'
import { RawVideo, Video } from 'types/video'
import { formatDate } from 'utils/formatting/time'
import StarRating from 'components/StarRating'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'

import VideoPlayer from './VideoPlayer'
import VideoTimestampList from './VideoTimestampList'

const StyledTimestampWrapper = styled.aside`
  position: relative;
`

interface Props {
  data: {
    videoData: RawVideo
  }
}

const VideoPage: React.FC<Props> = ({ data: { videoData } }) => {
  const video = normalizeItem(videoData) as Video

  const [isPlaying, setIsPlaying] = useState(false)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const videoComponent = useRef()

  const ownedBook =
    video.ownedBy &&
    (normalizeItem(video.ownedBy) as { rating7?: number; slug: string })

  return (
    <Layout>
      <Grid full>
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

        <GridItem>
          <h2>{video.title}</h2>
          {ownedBook && (
            <p>
              <StarRating of7={ownedBook.rating7} />
              <Link to={ownedBook.slug}>go to book page</Link>
            </p>
          )}

          {video.quote && <blockquote>{video.quote}</blockquote>}

          <time>{formatDate(video.datePublished)}</time>
          <p>{video.description}</p>
        </GridItem>

        <GridItem
          rowsFromL="1/2"
          columnsFromL="9 / 15"
          columnsFromXL="10 / 17"
          as={StyledTimestampWrapper}
        >
          <VideoTimestampList
            timestampData={videoData.timestamps}
            playedSeconds={playedSeconds}
            setPlayedSeconds={setPlayedSeconds}
            setIsPlaying={setIsPlaying}
            videoComponent={videoComponent}
          />
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
