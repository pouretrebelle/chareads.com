import { GoodreadsReview, BookIntermediary } from '../types'
import getTags from './getTags'

const getBookHeight = (
  review: GoodreadsReview
): BookIntermediary['bookHeight'] => {
  const tags = getTags(review)

  if (tags.includes('pub-penguin-modern')) return 160
  if (tags.includes('pub-little-black-classics')) return 160
  if (tags.includes('pub-great-ideas')) return 179
  if (tags.includes('pub-very-short-introductions')) return 172

  switch (review.book.format) {
    case 'Hardcover':
      return 220
      break
    case 'Audiobook':
      return 150
      break
    default:
      return 198
  }
}

export default getBookHeight
