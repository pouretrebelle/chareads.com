import { GoodreadsReview, GoodreadsShelf, BookIntermediary } from '../types'
import { normalizeArray } from './common'

const shelvesToRemove = ['own', 'read']

const getTags = (review: GoodreadsReview): BookIntermediary['tags'] =>
  normalizeArray<GoodreadsShelf>(review.shelves.shelf)
    .map((s) => s.name)
    .filter((tag) => !shelvesToRemove.includes(tag))

export default getTags
