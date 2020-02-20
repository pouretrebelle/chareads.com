import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { VideoCardType } from 'types/video/card'
import { shortFormatDate } from 'utils/formatting/time'
import H from 'components/H'
import { FONT } from 'styles/tokens'
import { screen } from 'styles/responsive'

const StyledP = styled.p`
  font-size: ${FONT.SIZE.S};
  margin: 0;
`

const StyledH = styled(H)`
  margin: 0;
`

const StyledVideoCard = styled(Link)`
  grid-column-end: span 2;
  margin: 0;

  ${screen.m`
    grid-column-end: span 4;
  `}
`

interface Props {
  video: VideoCardType
}

const VideoCard: React.FC<Props> = ({ video }) => {
  return (
    <StyledVideoCard to={video.slug}>
      <Img
        key={video.image.childImageSharp.fluid.src}
        fluid={video.image.childImageSharp.fluid}
      />
      <StyledP>
        <time>{shortFormatDate(video.datePublished)}</time>
      </StyledP>
      <StyledH as="h2" size="S">
        {video.title}
      </StyledH>
    </StyledVideoCard>
  )
}

export default VideoCard
