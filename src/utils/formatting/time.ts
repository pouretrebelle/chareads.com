import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)

const YEAR_FORMAT = 'YYYY'
const DATE_SHORT_FORMAT = 'Do MMM ’YY'
const DATE_LONG_FORMAT = 'dddd Do MMMM YYYY'

export const getDateObjFromString = (date: string): dayjs.Dayjs =>
  dayjs(new Date(date))

export const shortFormatDate = (date: string): string | null => {
  const dateObj = getDateObjFromString(date)
  if (dateObj.isValid()) return dateObj.format(DATE_SHORT_FORMAT)
  return null
}

export const formatDate = (date: string): string | null => {
  const dateObj = getDateObjFromString(date)
  if (dateObj.isValid()) return dateObj.format(DATE_LONG_FORMAT)
  return null
}

export const formatYear = (date: string): string | null => {
  const dateObj = getDateObjFromString(date)
  if (dateObj.isValid()) {
    const yearNumber = parseInt(dateObj.format(YEAR_FORMAT), 10)
    if (yearNumber < 0) return `${Math.abs(yearNumber)} BCE`
    if (yearNumber < 1000) return `${yearNumber} AD`
    return `${yearNumber}`
  }
  return null
}

export const formatTimestamp = (seconds: number): string =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

export const unformatTimestamp = (text: string): number =>
  Number(text.split(':')[0]) * 60 + Number(text.split(':')[1])

const sortDates = (dates: string[], asc?: boolean): string[] =>
  dates.sort((a, b) => {
    if (a < b) return asc ? -1 : 1
    if (a > b) return asc ? 1 : -1
    return 0
  })

export const getLastReadDate = (dates: [string, string][]): Date =>
  new Date(sortDates(dates.map((dateTuple) => dateTuple[1]))[0])

// return most recent out of reviewed or first read
export const getSortDate = (
  dateReviewed: string,
  readDates: [string, string][]
): string => {
  const firstRead = sortDates(
    readDates.map((dateTuple) => dateTuple[1]),
    true
  )[0]

  if (firstRead < dateReviewed) return dateReviewed
  return firstRead
}
