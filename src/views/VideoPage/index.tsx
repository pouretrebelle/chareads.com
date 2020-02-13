import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import { normalizeItem } from 'utils/graphql/normalize'
import Layout from 'Layout'
import { RawVideo, Video } from 'types/video'

interface Props {
  data: {
    videoData: RawVideo
  }
}

const VideoPage: React.FC<Props> = ({ data: { videoData } }) => {
  const video = normalizeItem(videoData) as Video

  return (
    <Layout>
      <h2>{video.title}</h2>

      <Img
        key={video.image.childImageSharp.fluid.src}
        fluid={video.image.childImageSharp.fluid}
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
