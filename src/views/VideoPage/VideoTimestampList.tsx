import React from 'react'

import { normalizeItem } from 'utils/graphql/normalize'
import { Timestamp, RawTimestamp } from 'types/timestamp'

import VideoTimestamp from './VideoTimestamp'

interface Props {
  timestampData: RawTimestamp[]
  playedSeconds: number
  setPlayedSeconds: React.Dispatch<React.SetStateAction<number>>
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  videoComponent: React.MutableRefObject<undefined>
}

const VideoTimestampList: React.FC<Props> = ({
  timestampData,
  playedSeconds,
  setPlayedSeconds,
  setIsPlaying,
  videoComponent,
}) => {
  const timestamps = (timestampData || []).map(({ t, text, book }) => ({
    t,
    text,
    book: book && normalizeItem(book),
  })) as Timestamp[]

  const jumpToTimestamp = (t: number, startPlaying: boolean): void => {
    if (!videoComponent.current) return
    const target = videoComponent.current as { seekTo: (t: number) => {} }

    target.seekTo(t)
    setPlayedSeconds(t)
    if (startPlaying) setIsPlaying(true)
  }

  let segment: number
  timestamps.forEach(({ t }, i) => {
    if (playedSeconds >= t) segment = i
  })

  return (
    <ol>
      {timestamps.map(({ t, text, book }, i) => (
        <VideoTimestamp
          key={t}
          t={t}
          text={text}
          book={book}
          jumpToTimestamp={jumpToTimestamp}
          active={segment === i}
        />
      ))}
    </ol>
  )
}

export default VideoTimestampList
