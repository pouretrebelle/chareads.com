import dotenv from 'dotenv'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

import { YoutubeVideo } from '../types'

dotenv.config()
dayjs.extend(duration)

const getDuration = (video: YoutubeVideo): string => {
  const duration = dayjs.duration(video.contentDetails.duration)
  const minutes = duration.minutes()
  const seconds = duration.seconds()
  if (minutes === 0) return String(seconds)
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export default getDuration
