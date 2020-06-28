import { Book } from 'types/book'
import { Video } from 'types/video'

import { relateBook } from '../schema'
import { sortBooksByRelation } from './sort'

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

  const involvedBookIds = booksFromInvolved.map(({ id }) => id)
  const allUninvolvedBooks = allBooks.filter(
    ({ id }) => !involvedBookIds.includes(id)
  )

  // return books related to owned book
  if (source.ownedBy && booksFromInvolved.length > 0) {
    return [
      ...booksFromInvolved,
      ...sortBooksByRelation(
        allUninvolvedBooks,
        [booksFromInvolved[0]],
        booksNeeded
      ),
    ]
  }

  // return mashup related to involved books
  return [
    ...booksFromInvolved,
    ...sortBooksByRelation(allUninvolvedBooks, booksFromInvolved, booksNeeded),
  ]
}
