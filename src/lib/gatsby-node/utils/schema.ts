import { Book } from 'types/book'
import {
  getBookDetailsFromString,
  formatBookDetails,
} from 'utils/formatting/text'
import { Video } from 'types/video'

export const relateBook = (source: string, allBooks: Book[]): {} => {
  const reference = getBookDetailsFromString(source)

  if (!reference) return null

  const refTitle = reference.title.toLowerCase()
  const refAuthor = reference.author.toLowerCase()

  return allBooks.find((book: Book) => {
    if (
      refTitle === book.title.toLowerCase() &&
      refAuthor === book.author.toLowerCase()
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
    context.nodeModel.getAllNodes({ type: 'Book' })
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
