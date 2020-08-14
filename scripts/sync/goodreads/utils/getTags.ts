import { GoodreadsBook } from '../types'

const shelvesToRemove = ['own']

const getTags = (book: GoodreadsBook): string[] =>
  book.shelves.filter((tag) => !shelvesToRemove.includes(tag))

export default getTags
