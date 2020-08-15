import { GoodreadsReview, BookIntermediary } from '../types'
import { sanitizeQuotes, sanitizeHtml } from './common'

const getReview = (review: GoodreadsReview): BookIntermediary['review'] =>
  review.body !== '\n  '
    ? sanitizeHtml(sanitizeQuotes(review.body.slice(7)))
    : undefined

export default getReview
