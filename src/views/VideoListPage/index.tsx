import React from 'react'
import { graphql } from 'gatsby'

import { PageProps } from 'types/page'
import { normalizeArray } from 'utils/graphql/normalize'
import Layout from 'Layout'
import { VideoCardType } from 'types/video'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import VideoCard from 'components/cards/VideoCard'
import InfiniteScroll from 'components/InfiniteScroll'

interface Props extends PageProps {
  data: {
    videoData: {
      edges: {
        node: VideoCardType
      }[]
    }
  }
}

const VideoListPage: React.FC<Props> = ({ data: { videoData }, location }) => {
  const videos = normalizeArray(videoData) as VideoCardType[]

  return (
    <Layout location={location} navOpenOnDesktop navTitle="Bookish videos">
      <Grid as="ol" full>
        <InfiniteScroll
          items={videos}
          renderItem={(video: VideoCardType): React.ReactNode => (
            <GridItem
              as="li"
              key={video.id}
              span={1}
              spanFromM={video.featured ? 6 : 3}
              spanFromL={video.featured ? 4 : 2}
            >
              <VideoCard
                video={video}
                featured={video.featured}
                big={video.featured}
              />
            </GridItem>
          )}
        />
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query VideoListPage {
    videoData: allVideo(sort: { fields: datePublished, order: DESC }) {
      edges {
        node {
          ...VideoCardFields
        }
      }
    }
  }
`

export default VideoListPage
