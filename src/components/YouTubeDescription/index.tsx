import React from 'react'
import styled from 'styled-components'

import { Video } from 'types/video'
import UnicodeStarRating from 'components/StarRating/UnicodeStarRating'
import { formatTimestamp } from 'utils/formatting/time'
import { stripHtml } from 'utils/formatting/text'
import { BookSnapshot } from 'types/book'

const StyledPre = styled.pre`
  padding: 1em;
  background: snow;
  max-height: 15em;
  overflow: auto;
  white-space: pre-wrap;
`

interface BookLinksProps {
  book: BookSnapshot
}

const BookLinks: React.FC<BookLinksProps> = ({ book }) => (
  <>
    Find on Chareads - https://chareads.com{book.slug}
    <br />
    See on Goodreads - {book.links.short.gr}
    <br />
    Buy on Book Depository - {book.links.short.bd}
    <br />
    Buy on Amazon - {book.links.short.amzn}
  </>
)

interface Props {
  video: Video
}
const YoutubeDescription: React.FC<Props> = ({ video }) => (
  <StyledPre contentEditable>
    {video.ownedBy ? (
      <>
        <UnicodeStarRating of7={video.ownedBy.rating7} />
        {video.quote && (
          <>
            “{video.quote.trim()}”<br />
          </>
        )}
        Timestamps and links below the fold ↓
      </>
    ) : (
      <>
        {stripHtml(video.html)}
        <br />
        Timestamps, ratings, and links below the fold ↓
      </>
    )}
    <br />
    {video.timestamps.map((timestamp) => (
      <span key={timestamp.t}>
        <br />
        {formatTimestamp(timestamp.t)} {timestamp.text}
        {timestamp.book && (
          <>
            <br />
            <UnicodeStarRating of7={timestamp.book.rating7} />
            <BookLinks book={timestamp.book} />
          </>
        )}
        {!video.ownedBy && <br />}
      </span>
    ))}
    {video.ownedBy && (
      <>
        <br />
        <br />
        <BookLinks book={video.ownedBy as BookSnapshot} />
      </>
    )}
  </StyledPre>
)

export default YoutubeDescription
