import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)

const DATE_SHORT_FORMAT = 'DD/MM/YYYY'
const DATE_LONG_FORMAT = 'dddd Do MMMM YYYY'

export const shortFormatDate = (date: Date): string | null => {
  const dateObj = dayjs(date)
  if (dateObj.isValid()) return dateObj.format(DATE_SHORT_FORMAT)
  return null
}

export const formatDate = (date: Date): string | null => {
  const dateObj = dayjs(date)
  if (dateObj.isValid()) return dateObj.format(DATE_LONG_FORMAT)
  return null
}

export const formatTimestamp = (seconds: number): string =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

export const unformatTimestamp = (text: string): number =>
  Number(text.split(':')[0]) * 60 + Number(text.split(':')[1])
