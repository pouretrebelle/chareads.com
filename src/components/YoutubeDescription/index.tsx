import React from 'react'
import styled from 'styled-components'

import { Video } from 'types/video'
import UnicodeStarRating from 'components/StarRating/UnicodeStarRating'
import { Timestamp } from 'types/timestamp'
import { normalizeItem } from 'utils/graphql/normalize'
import { formatTimestamp } from 'utils/formatting/time'

const StyledPre = styled.pre`
  padding: 1em;
  background: snow;
  max-height: 15em;
  overflow: auto;
  white-space: pre-wrap;
`

interface Props {
  video: Video
}

const YoutubeDescription: React.FC<Props> = ({ video }) => {
  const timestamps = video.timestamps.map(({ t, text, book }) => ({
    t,
    text,
    book: book && normalizeItem(book),
  })) as Timestamp[]

  return (
    <StyledPre contentEditable>
      {video.ownedBy ? (
        <>
          <UnicodeStarRating of7={video.ownedBy.frontmatter.rating7} />
          {video.quote && <p>“{video.quote}”</p>}
          Timestamps and links below the fold ↓
        </>
      ) : (
        <>
          {video.description}
          <br />
          Timestamps, ratings, and links below the fold ↓
        </>
      )}
      <br />
      {timestamps.map((timestamp) => (
        <span key={timestamp.t}>
          <br />
          {formatTimestamp(timestamp.t)} {timestamp.text}
          {timestamp.book && (
            <>
              <br />
              <UnicodeStarRating of7={timestamp.book.rating7} />
              Find on Chareads - https://chareads.com{timestamp.book.slug}
              <br />
              See on Goodreads - {timestamp.book.links.short.gr}
              <br />
              Buy on Book Depository - {timestamp.book.links.short.bd}
              <br />
              Buy on Amazon - {timestamp.book.links.short.amzn}
            </>
          )}
          {!video.ownedBy && <br />}
        </span>
      ))}
    </StyledPre>
  )
}

export default YoutubeDescription
