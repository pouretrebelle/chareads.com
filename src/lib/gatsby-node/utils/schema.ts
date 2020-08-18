import { Book } from 'types/book'
import { Video } from 'types/video'
import {
  getBookDetailsFromString,
  formatBookDetails,
} from 'utils/formatting/text'
import { getAffiliateLinks } from 'utils/urls/affiliates'

import { TBR_BOOKS } from '../../../../content/books/tbr'

const enhancedTbrBooks = TBR_BOOKS.map(({ isbn13, ...book }) => ({
  ...book,
  id: isbn13,
  links: getAffiliateLinks(isbn13),
}))

export const relateBook = (
  source: string,
  allBooks: Book[],
  includeTbr?: boolean
): {} => {
  const reference = getBookDetailsFromString(source)

  if (!reference) return null

  const refTitle = reference.title.toLowerCase()
  const refAuthor = reference.author.toLowerCase()

  const booksToCheck = includeTbr
    ? [...allBooks, ...enhancedTbrBooks]
    : allBooks

  return booksToCheck.find(({ title, author }) => {
    if (
      refTitle === title.toLowerCase() &&
      refAuthor === author.toLowerCase()
    ) {
      return true
    }

    return false
  })
}

export const relateBookByField = (fieldToRelate: string) => (
  source: { book?: string },
  args: {},
  context: { nodeModel: { getAllNodes: ({ type: string }) => Book[] } }
): {} => {
  if (!source[fieldToRelate]) return null

  return relateBook(
    source[fieldToRelate],
    context.nodeModel.getAllNodes({ type: 'Book' }),
    true
  )
}

export const getTimestampTextFromBook = (source: {
  text?: string
  book?: string
}): string => {
  if (source.text) return source.text

  const reference = getBookDetailsFromString(source.book)

  return reference ? formatBookDetails(reference) : source.book
}

export const relateVideoToBook = (
  source: Book,
  args: {},
  context: { nodeModel: { getAllNodes: ({ type: string }) => Video[] } }
): {} => {
  const title = source.title.toLowerCase()
  const author = source.author.toLowerCase()

  return context.nodeModel
    .getAllNodes({ type: 'Video' })
    .find((video: Video) => {
      if (!video.ownedBy) return false

      const reference = getBookDetailsFromString(
        (video.ownedBy as unknown) as string
      )
      const refTitle = reference.title.toLowerCase()
      const refAuthor = reference.author.toLowerCase()

      if (title === refTitle && author === refAuthor) return true

      return false
    })
}
