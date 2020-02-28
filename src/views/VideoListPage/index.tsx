import React from 'react'
import { graphql } from 'gatsby'

import { normalizeArray } from 'utils/graphql/normalize'
import Layout from 'Layout'
import { RawVideoCard, VideoCardType } from 'types/video/card'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import VideoCard from 'components/cards/VideoCard'
import InfiniteScroll from 'components/InfiniteScroll'

interface Props {
  data: {
    videoData: {
      edges: {
        node: RawVideoCard
      }[]
    }
  }
}

const VideoListPage: React.FC<Props> = ({ data: { videoData } }) => {
  const videos = normalizeArray(videoData) as VideoCardType[]

  return (
    <Layout>
      <Grid as="ol">
        <InfiniteScroll
          items={videos}
          renderItem={(video: VideoCardType): React.ReactNode => (
            <GridItem as="li" key={video.id} span={1} spanFromM={3}>
              <VideoCard video={video} featured={video.featured} />
            </GridItem>
          )}
        />
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query VideoListPage {
    videoData: allVideos(sort: { fields: datePublished, order: DESC }) {
      edges {
        node {
          ...VideoCardFields
        }
      }
    }
  }
`

export default VideoListPage
