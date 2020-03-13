import { RawBook } from 'types/book'
import {
  getBookDetailsFromString,
  formatBookDetails,
} from 'utils/formatting/text'
import { RawVideo } from 'types/video'

export const relateBook = (source: string, allBooks: RawBook[]): {} => {
  const reference = getBookDetailsFromString(source)

  if (!reference) return null

  const refTitle = reference.title.toLowerCase()
  const refAuthor = reference.author.toLowerCase()

  return allBooks.find((book: RawBook) => {
    if (
      refTitle === book.frontmatter.title.toLowerCase() &&
      refAuthor === book.frontmatter.author.toLowerCase()
    ) {
      return true
    }

    return false
  })
}

export const relateBookByField = (fieldToRelate: string) => (
  source: { book?: string },
  args: {},
  context: { nodeModel: { getAllNodes: ({ type: string }) => RawBook[] } }
): {} => {
  if (!source[fieldToRelate]) return null

  return relateBook(
    source[fieldToRelate],
    context.nodeModel.getAllNodes({ type: 'MarkdownRemark' })
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
  source: RawBook,
  args: {},
  context: { nodeModel: { getAllNodes: ({ type: string }) => RawVideo[] } }
): {} => {
  const title = source.frontmatter.title.toLowerCase()
  const author = source.frontmatter.author.toLowerCase()

  return context.nodeModel
    .getAllNodes({ type: 'Videos' })
    .find((video: RawVideo) => {
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
