import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { VideoCardType } from 'types/video/card'
import { shortFormatDate } from 'utils/formatting/time'
import H from 'components/H'

interface Props {
  video: VideoCardType
}

const VideoCard: React.FC<Props> = ({ video }) => {
  return (
    <Link
      to={video.slug}
      style={{
        display: 'inline-block',
        width: 200,
        margin: 0,
        verticalAlign: 'top',
      }}
    >
      <Img
        key={video.image.childImageSharp.fluid.src}
        fluid={video.image.childImageSharp.fluid}
      />
      <H as="h2" decorative={false} size="M">
        {video.title}
      </H>
      <p>
        <time>{shortFormatDate(video.datePublished)}</time>
      </p>
    </Link>
  )
}

export default VideoCard
