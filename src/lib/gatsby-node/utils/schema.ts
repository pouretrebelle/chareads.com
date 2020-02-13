import { RawBook } from 'types/book'
import {
  getBookDetailsFromString,
  formatBookDetails,
} from 'utils/formatting/text'

export const relateBookByField = (fieldToRelate: string) => (
  source: { book?: string },
  args: {},
  context: { nodeModel: { getAllNodes: ({ type: string }) => RawBook[] } }
): {} =>
  context.nodeModel
    .getAllNodes({ type: 'MarkdownRemark' })
    .find((book: RawBook) => {
      if (!source[fieldToRelate]) return false

      const reference = getBookDetailsFromString(source[fieldToRelate])

      if (!reference) return false
      if (
        reference.title === book.frontmatter.title &&
        reference.author === book.frontmatter.author
      ) {
        return true
      }

      return false
    })

export const getTimestampTextFromBook = (source: {
  text?: string
  book?: string
}): string => {
  if (source.text) return source.text

  const reference = getBookDetailsFromString(source.book)

  return reference ? formatBookDetails(reference) : source.book
}
