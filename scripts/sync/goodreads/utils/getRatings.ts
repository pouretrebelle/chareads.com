import { GoodreadsReview, BookIntermediary } from '../types'

export const getRating5 = (
  review: GoodreadsReview
): BookIntermediary['rating5'] => (review.rating ? review.rating : undefined)
