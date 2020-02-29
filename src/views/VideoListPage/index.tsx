import React from 'react'
import { graphql } from 'gatsby'

import { PageProps } from 'types/page'
import { normalizeArray } from 'utils/graphql/normalize'
import Layout from 'Layout'
import { RawVideoCard, VideoCardType } from 'types/video/card'
import Grid from 'components/Grid'
import GridItem from 'components/Grid/GridItem'
import VideoCard from 'components/cards/VideoCard'
import H from 'components/H'
import TextIntro from 'components/Wrapper/TextIntro'
import InfiniteScroll from 'components/InfiniteScroll'

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
      <TextIntro>
        <H as="h1" size="XXL" decorative>
          Videos
        </H>
        <p>
          {videos.length} bookish videos, starting way back in February 2014!
        </p>
      </TextIntro>

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
