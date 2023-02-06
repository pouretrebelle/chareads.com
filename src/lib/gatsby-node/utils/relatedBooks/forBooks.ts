import { Book } from 'types/book'

import { sortBooksByRelation } from './sort'

export const addRelatedBooksToBook = async (
  source: Book,
  args: object,
  context: {
    nodeModel: {
      findAll: ({ type }: { type: string }) => Promise<{ entries: Book[] }>
    }
  }
): Promise<object> => {
  const { entries } = await context.nodeModel.findAll({
    type: 'Book',
  })
  const allBooks: Book[] = []
  entries.forEach((book) => allBooks.unshift(book))

  return sortBooksByRelation(allBooks, [source], 8)
}
