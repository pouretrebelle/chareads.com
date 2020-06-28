import { Book } from 'types/book'

import { sortBooksByRelation } from './sort'

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
