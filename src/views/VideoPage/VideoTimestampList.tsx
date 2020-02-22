import React from 'react'
import styled from 'styled-components'

import { normalizeItem } from 'utils/graphql/normalize'
import { Timestamp, RawTimestamp } from 'types/timestamp'
import { COLOR, BORDER_RADIUS } from 'styles/tokens'
import { screen } from 'styles/responsive'
import { toVW, getWidthOfColumns } from 'styles/layout'

import VideoTimestamp from './VideoTimestamp'

const StyledVideoTimestampList = styled.ol`
  margin: -0.5em 0 0 -0.5em;
  width: 100%;
  overflow: auto;
  max-height: 500px;

  ${screen.l`
    max-height: calc(0.5em + ${toVW((getWidthOfColumns.l(8) * 9) / 16)});
  `}

  ${screen.xl`
    max-height: calc(0.5em + ${toVW((getWidthOfColumns.xl(9) * 9) / 16)});
  `}

    ::-webkit-scrollbar {
    width: 0.5em;
    border-left: 1px solid ${COLOR.BACKGROUND_CARD};
    border-radius: 0 ${BORDER_RADIUS.S} ${BORDER_RADIUS.S} 0;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
  }
`

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
    <StyledVideoTimestampList>
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
    </StyledVideoTimestampList>
  )
}

export default VideoTimestampList
