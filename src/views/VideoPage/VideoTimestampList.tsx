import React from 'react'
import styled from 'styled-components'

import { Timestamp } from 'types/timestamp'
import { COLOR, BORDER_RADIUS } from 'styles/tokens'
import { screen } from 'styles/responsive'
import { toVW, getWidthOfColumns } from 'styles/layout'

import VideoTimestamp from './VideoTimestamp'

const StyledVideoTimestampList = styled.ol`
  margin: 0 0 0 -0.5em;
  width: calc(0.5em + 100%);
  overflow: auto;
  max-height: 300px;

  ${screen.l`
    max-height: calc(1em + ${toVW((getWidthOfColumns.l(7) * 9) / 16)});
  `}

  ${screen.xl`
    max-height: calc(1em + ${toVW((getWidthOfColumns.xl(8) * 9) / 16)});
  `}

    ::-webkit-scrollbar {
    width: 0.5em;
    border-left: 1px solid ${COLOR.BACKGROUND_DARK};
    border-radius: 0 ${BORDER_RADIUS.S} ${BORDER_RADIUS.S} 0;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
  }
`

interface Props {
  timestamps: Timestamp[]
  playedSeconds: number
  setPlayedSeconds: React.Dispatch<React.SetStateAction<number>>
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  videoComponent: React.MutableRefObject<undefined>
}

const VideoTimestampList: React.FC<Props> = ({
  timestamps,
  playedSeconds,
  setPlayedSeconds,
  setIsPlaying,
  videoComponent,
}) => {
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
