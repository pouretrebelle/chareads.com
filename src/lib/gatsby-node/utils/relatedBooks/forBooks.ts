import { Book } from 'types/book'

import { sortBooksByRelation } from './sort'

export const addRelatedBooksToBook = async (
  source: Book,
  args: {},
  context: {
    nodeModel: { findAll: ({ type: string }) => Promise<{ entries: Book[] }> }
  }
): Promise<{}> => {
  const { entries } = await context.nodeModel.findAll({
    type: 'Book',
  })
  const allBooks: Book[] = []
  entries.forEach(book => allBooks.unshift(book))

  return sortBooksByRelation(allBooks, [source], 8)
}
