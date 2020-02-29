import { RawBook, Book } from 'types/book'
import { normalizeItem } from 'utils/graphql/normalize'

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
    .filter((tag) => a.tags.includes(tag))
    .map((tag) => {
      const matches = tag.match(/^([^-]+)/)

      return matches ? tagStarts[matches[1]] || 0 : 0
    })
    .reduce((acc, cur) => acc + cur, 0)

  return points
}

export const addRelatedBooksToBook = (
  source: RawBook,
  args: {},
  context: { nodeModel: { getAllNodes: ({ type: string }) => RawBook[] } }
): {} => {
  const sourceBook = normalizeItem(source) as Book

  const allBooks = context.nodeModel.getAllNodes({
    type: 'MarkdownRemark',
  }) as RawBook[]

  const bookList = []
  allBooks.forEach((book) => {
    if (book.id === source.id) return

    bookList.push({
      points: compareBooks(sourceBook, normalizeItem(book) as Book),
      data: book,
    })
  })

  return bookList
    .sort((a, b) => b.points - a.points)
    .slice(0, 8)
    .map((a) => a.data)
}
