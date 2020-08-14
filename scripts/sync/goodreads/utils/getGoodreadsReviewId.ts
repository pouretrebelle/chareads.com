import { GoodreadsBook } from '../types'

const getGoodreadsReviewId = (book: GoodreadsBook): string => {
  const parts = book.review.link.split('/')

  return parts[parts.length - 1]
}

export default getGoodreadsReviewId
