import dayjs from 'dayjs'
import { GoodreadsBook, BookIntermediary } from '../types'
import { getRating5 } from './getRatings'

const INPUT_FORMAT = 'YYYY/MM/DD'
const OUTPUT_FORMAT = 'YYYY-MM-DD'

const formatDate = (date: string): string =>
  date === ''
    ? dayjs().format(OUTPUT_FORMAT)
    : dayjs(date, INPUT_FORMAT).format(OUTPUT_FORMAT)

const getDateRead = (book: GoodreadsBook): string => formatDate(book.dateRead)

export const getReadDates = (
  book: GoodreadsBook
): BookIntermediary['readDates'] => [
  [getDateRead(book), formatDate(book.dateRead)],
]

export const getDateRated = (
  book: GoodreadsBook
): BookIntermediary['dateRated'] =>
  book.myRating !== '0' ? getDateRead(book) : undefined

export const getDateReviewed = (
  book: GoodreadsBook
): BookIntermediary['dateReviewed'] =>
  getRating5(book) ? dayjs().format(OUTPUT_FORMAT) : undefined
