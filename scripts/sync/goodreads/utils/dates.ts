import dayjs from 'dayjs'
import {
  GoodreadsReview,
  GoodreadsReadStatus,
  BookIntermediary,
} from '../types'
import { getRating5 } from './getRatings'
import { normalizeArray } from './common'

const INPUT_FORMAT = 'DDD mmm d HH:mm:ss ZZ YYYY'
const OUTPUT_FORMAT = 'YYYY-MM-DD'

const getDateRead = (review: GoodreadsReview): string => {
  if (review.read_at)
    return dayjs(review.read_at, INPUT_FORMAT).format(OUTPUT_FORMAT)

  const lastReadStatus =
    review.read_statuses &&
    normalizeArray<GoodreadsReadStatus>(review.read_statuses.read_status).find(
      (r) => r.status === 'read'
    )

  if (lastReadStatus)
    return dayjs(lastReadStatus.updated_at._, INPUT_FORMAT).format(
      OUTPUT_FORMAT
    )

  return dayjs().format(OUTPUT_FORMAT)
}

export const getDateBookPublished = (
  review: GoodreadsReview
): BookIntermediary['dateBookPublished'] =>
  dayjs()
    .year(review.book.publication_year)
    .month(review.book.publication_month)
    .day(review.book.publication_day)
    .format(OUTPUT_FORMAT)

export const getReadDates = (
  review: GoodreadsReview
): BookIntermediary['readDates'] => {
  const end = getDateRead(review)

  const start = review.started_at
    ? dayjs(review.started_at, INPUT_FORMAT).format(OUTPUT_FORMAT)
    : dayjs(end)
        .subtract(7, 'day') // guess it was a week before lol
        .format(OUTPUT_FORMAT)

  return [[start, end]]
}

export const getDateRated = (
  review: GoodreadsReview
): BookIntermediary['dateRated'] =>
  getRating5(review) ? getDateRead(review) : undefined

export const getDateReviewed = (
  review: GoodreadsReview
): BookIntermediary['dateReviewed'] =>
  review.body !== '\n  ' ? dayjs().format(OUTPUT_FORMAT) : undefined
