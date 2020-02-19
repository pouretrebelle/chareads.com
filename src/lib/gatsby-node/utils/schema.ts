import { RawBook } from 'types/book'
import {
  getBookDetailsFromString,
  formatBookDetails,
} from 'utils/formatting/text'

export const relateBookByField = (fieldToRelate: string) => (
  source: { book?: string },
  args: {},
  context: { nodeModel: { getAllNodes: ({ type: string }) => RawBook[] } }
): {} => {
  if (!source[fieldToRelate]) return null

  const reference = getBookDetailsFromString(source[fieldToRelate])

  if (!reference) return null

  const refTitle = reference.title.toLowerCase()
  const refAuthor = reference.author.toLowerCase()

  return context.nodeModel
    .getAllNodes({ type: 'MarkdownRemark' })
    .find((book: RawBook) => {
      if (
        refTitle === book.frontmatter.title.toLowerCase() &&
        refAuthor === book.frontmatter.author.toLowerCase()
      ) {
        return true
      }

      return false
    })
}

export const getTimestampTextFromBook = (source: {
  text?: string
  book?: string
}): string => {
  if (source.text) return source.text

  const reference = getBookDetailsFromString(source.book)

  return reference ? formatBookDetails(reference) : source.book
}
