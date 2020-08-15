import { GoodreadsReview, GoodreadsAuthor, BookIntermediary } from '../types'
import { normalizeArray } from './common'

const getAuthor = (review: GoodreadsReview): BookIntermediary['author'] =>
  normalizeArray<GoodreadsAuthor>(review.book.authors.author)[0].name

export default getAuthor
