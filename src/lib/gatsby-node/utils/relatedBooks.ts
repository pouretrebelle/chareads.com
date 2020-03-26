import { Book } from 'types/book'
import { Video } from 'types/video'
import { relateBook } from './schema'

const tagStarts = {
  genre: 2,
  sub: 2,
  pub: 1,
  type: 1,
}

export const compareBooks = (a: Book, b: Book): number => {
  let points = 0

  if (a.author && b.author && a.author.toLowerCase() === b.author.toLowerCase())
    points += 3

  points += (b.tags || [])
    .filter((tag) => (a.tags || []).includes(tag))
    .map((tag) => {
      const matches = tag.match(/^([^-]+)/)

      return matches ? tagStarts[matches[1]] || 0 : 0
    })
    .reduce((acc, cur) => acc + cur, 0)

  return points
}

const sortBooksByRelation = (
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

export const addRelatedBooksToBook = (
  source: Book,
  args: {},
  context: { nodeModel: { getAllNodes: ({ type: string }) => Book[] } }
): {} => {
  const allBooks = context.nodeModel
    .getAllNodes({
      type: 'Book',
    })
    .reverse() as Book[]

  return sortBooksByRelation(allBooks, [source], 8)
}

export const addRelatedBooksToVideo = (
  source: Video,
  args: {},
  context: { nodeModel: { getAllNodes: ({ type: string }) => Book[] } }
): {} => {
  const allBooks = context.nodeModel
    .getAllNodes({
      type: 'Book',
    })
    .reverse() as Book[]

  const involvedBookStrings = [
    (source.ownedBy as unknown) as string,
    ...(source.timestamps || []).map(
      (t): string => (t.book as unknown) as string
    ),
  ].filter((b) => b)

  // return empty array for videos with no book involvement
  if (!involvedBookStrings.length) return []

  const booksFromInvolved = involvedBookStrings
    .map((b) => relateBook(b, allBooks))
    .filter((b) => b) as Book[]

  if (booksFromInvolved.length >= 8) return booksFromInvolved.slice(0, 8)

  const booksNeeded = 8 - booksFromInvolved.length

  // return books related to owned book
  if (source.ownedBy && booksFromInvolved.length > 0) {
    return [
      ...booksFromInvolved,
      ...sortBooksByRelation(allBooks, [booksFromInvolved[0]], booksNeeded),
    ]
  }

  // return mashup related to involved books
  return [
    ...booksFromInvolved,
    ...sortBooksByRelation(allBooks, booksFromInvolved, booksNeeded),
  ]
}
