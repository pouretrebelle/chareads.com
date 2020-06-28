import { Book } from 'types/book'

import { compareBooks } from './compare'

export const sortBooksByRelation = (
  allBooks: Book[],
  sources: Book[],
  count: number
): Book[] => {
  if (!sources) return []

  const bookList = []
  allBooks.forEach((book) => {
    if (sources.map((s) => s.id).includes(book.id)) return

    bookList.push({
      points: sources
        .map((source) => compareBooks(source, book))
        .reduce((acc, cur) => acc + cur, 0),
      data: book,
    })
  })

  return bookList
    .sort((a, b) => b.points - a.points)
    .slice(0, count)
    .map((a) => a.data)
}
