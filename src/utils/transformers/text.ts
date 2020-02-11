import { getBookSlug } from 'utils/urls/slugs'
import { Book } from 'types/book'

type BookDetails = {
  title?: string
  author?: string
  slug?: string
}

export const splitBookDetailsString = (text: string): BookDetails => {
  const referenceMatch = text.match(/^(.+), (.+)$/)
  return referenceMatch
    ? {
        title: referenceMatch[1],
        author: referenceMatch[2],
      }
    : {}
}

export const formatBookDetails = ({
  title,
  author,
}: Pick<Book, 'title' | 'author'>): string => `${title} by ${author}`

export const structureBookDetails = (text: string): BookDetails => {
  const bookDetails = splitBookDetailsString(text)

  return bookDetails.title
    ? {
        slug: getBookSlug(bookDetails),
        ...bookDetails,
      }
    : {}
}
