import { GoodreadsBook, BookIntermediary } from '../types'

const shelvesToRemove = ['own', 'read']

const getTags = (book: GoodreadsBook): BookIntermediary['tags'] =>
  book.bookshelves.split(', ').filter((tag) => !shelvesToRemove.includes(tag))

export default getTags
