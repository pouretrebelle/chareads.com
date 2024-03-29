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
): object => {
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

export const relateBookByField =
  (fieldToRelate: string) =>
  async (
    source: { book?: string },
    args: object,
    context: {
      nodeModel: {
        findAll: ({ type }: { type: string }) => Promise<{ entries: Book[] }>
      }
    }
  ): Promise<object> => {
    if (!source[fieldToRelate]) return null

    const { entries: allBooks } = await context.nodeModel.findAll({
      type: 'Book',
    })

    return relateBook(source[fieldToRelate], allBooks, true)
  }

export const getTimestampTextFromBook = (source: {
  text?: string
  book?: string
}): string => {
  if (source.text) return source.text

  const reference = getBookDetailsFromString(source.book)

  return reference ? formatBookDetails(reference) : source.book
}

export const relateVideoToBook = async (
  source: Book,
  args: object,
  context: {
    nodeModel: {
      findOne: ({
        type,
        query,
      }: {
        type: string
        query: object
      }) => Promise<{ entry: Video }>
    }
  }
): Promise<object> => {
  return context.nodeModel.findOne({
    type: 'Video',
    query: {
      filter: {
        book: {
          title: { eq: source.title },
          author: { eq: source.author },
        },
      },
    },
  })
}
