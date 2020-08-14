import dayjs from 'dayjs'
import { GoodreadsBook } from '../types'
import { getRating7, getRating5 } from './getRatings'

const formatDate = (date: string): string =>
  date ? date.slice(0, 10) : undefined

export const getDateBookPublished = (book: GoodreadsBook): string =>
  formatDate(book.publicationDate)

export const getReadDates = (book: GoodreadsBook): [string, string][] => {
  const end = book.dateRead
  const start =
    book.dateStarted ||
    dayjs(book.dateRead)
      .subtract(7, 'day')
      .format() // guess it was a week before lol

  return [[formatDate(start), formatDate(end)]]
}

export const getDateRated = (book: GoodreadsBook): string =>
  getRating5(book) || getRating7(book)
    ? book.dateRead
      ? formatDate(book.dateRead)
      : formatDate(book.dateUpdated)
    : undefined

export const getDateReviewed = (book: GoodreadsBook): string =>
  book.review.body
    ? book.dateRead
      ? formatDate(book.dateRead)
      : formatDate(book.dateUpdated)
    : undefined
