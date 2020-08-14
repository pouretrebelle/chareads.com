import { GoodreadsBook } from '../types'

const shelvesToRemove = ['own', 'read']

const getTags = (book: GoodreadsBook): string[] =>
  book.shelves.filter((tag) => !shelvesToRemove.includes(tag))

export default getTags
