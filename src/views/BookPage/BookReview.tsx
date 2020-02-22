import React from 'react'
import styled from 'styled-components'

import { Book } from 'types/book'
import { VideoSnapshot } from 'types/video/snapshot'
import { formatTimestamp } from 'utils/formatting/time'
import GridItem from 'components/Grid/GridItem'
import VideoCard from 'components/cards/VideoCard'
import { VideoCardType } from 'types/video/card'

const StyledBookReview = styled.div`
  margin-top: 1em;
`

type BookProps = Pick<Book, 'summary' | 'html'>

interface Props extends BookProps {
  timestampMentions: VideoSnapshot[]
  featuredVideos: VideoSnapshot[]
  bookId: string
}

const BookReview: React.FC<Props> = ({
  summary,
  html,
  timestampMentions,
  featuredVideos,
  bookId,
}) => (
  <>
    <GridItem
      as={StyledBookReview}
      spanRows={2}
      columnsFromM="5/13"
      columnsFromL="8/15"
      columnsFromXL="9/15"
    >
      {summary && (
        <details style={{ fontSize: '0.75em' }}>
          <summary>Book sumary</summary>
          {summary}
        </details>
      )}

      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
    </GridItem>

    {featuredVideos.map((video) => (
      <GridItem
        key={video.id}
        span={1}
        spanFromM={4}
        spanFromL={3}
        spanFromXL={4}
      >
        <VideoCard video={video as VideoCardType} />
      </GridItem>
    ))}

    {timestampMentions.map((mention) => {
      const timestamp = formatTimestamp(
        mention.timestamps.find((t) => t.book && t.book.id === bookId).t
      )

      return (
        <GridItem
          key={mention.id}
          span={1}
          spanFromM={4}
          spanFromL={3}
          spanFromXL={4}
        >
          <VideoCard video={mention as VideoCardType} timestamp={timestamp} />
        </GridItem>
      )
    })}
  </>
)

export default BookReview
