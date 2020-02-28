import React from 'react'
import { graphql } from 'gatsby'

import { PageProps } from 'types/page'
import { normalizeArray } from 'utils/graphql/normalize'
import Layout from 'Layout'
import { RawVideoCard, VideoCardType } from 'types/video/card'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import VideoCard from 'components/cards/VideoCard'

interface Props extends PageProps {
  data: {
    videoData: {
      edges: {
        node: RawVideoCard
      }[]
    }
  }
}

const VideoListPage: React.FC<Props> = ({ data: { videoData }, location }) => {
  const videos = normalizeArray(videoData) as VideoCardType[]

  return (
    <Layout location={location}>
      <Grid as="ol">
        {videos.length &&
          videos.map((video) => (
            <GridItem as="li" key={video.id} span={1} spanFromM={3}>
              <VideoCard video={video} featured={video.featured} />
            </GridItem>
          ))}
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
