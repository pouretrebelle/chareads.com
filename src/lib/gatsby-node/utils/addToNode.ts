import viewCounts from 'viewCounts'
import { Video } from 'types/video'

export const getVideoCount = ({
  youtubeId,
}: Pick<Video, 'youtubeId'>): number => viewCounts[youtubeId] || null
