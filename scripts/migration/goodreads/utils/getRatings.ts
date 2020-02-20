import { GoodreadsBook } from '../types'
import { ratingMap } from '../../videos'

export const getRating5 = (book: GoodreadsBook): number =>
  book.review.rating ? book.review.rating : undefined

export const getRating7 = (book: GoodreadsBook): number => {
  const [fullTitle, shortTitle] = book.title.match(
    /^(.+?)(?:: .+)?(?: \(.+\))?$/
  )
  const shortName = `${shortTitle}, ${book.author}`.toLowerCase()
  const fullName = `${fullTitle}, ${book.author}`.toLowerCase()
  return ratingMap[shortName] || ratingMap[fullName] || undefined
}
