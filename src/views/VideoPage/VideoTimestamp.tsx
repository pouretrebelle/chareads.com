import React from 'react'
import { Link } from 'gatsby'

import { Timestamp } from 'types/timestamp'
import { formatTimestamp } from 'utils/formatting/time'
import StarRating from 'components/StarRating'

interface Props extends Timestamp {
  jumpToTimestamp: (t: number, startPlaying: boolean) => void
  active: boolean
}

const VideoTimestamp: React.FC<Props> = ({
  t,
  text,
  book,
  active,
  jumpToTimestamp,
}) => (
  <li
    key={t}
    onClick={(): void => jumpToTimestamp(t, true)}
    style={
      active
        ? {
            background: 'thistle',
          }
        : undefined
    }
  >
    {formatTimestamp(t)} - {text}
    {book && (
      <p>
        <StarRating of7={book.rating7} />
        <Link to={book.slug}>go to book page</Link>
      </p>
    )}
  </li>
)

export default VideoTimestamp
