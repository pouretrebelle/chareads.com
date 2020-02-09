import { getBookSlug } from 'utils/urls/slugs'

export const splitBookDetailsString = (string: string): any => {
  const referenceMatch = string.match(/^(.+), (.+)$/)
  return referenceMatch
    ? {
        title: referenceMatch[1],
        author: referenceMatch[2],
      }
    : {}
}

export const formatBookDetails = ({ title, author }) => `${title} by ${author}`

type StructureBookDetails = (string: string) => any

export const structureBookDetails: StructureBookDetails = (string) => {
  const bookDetails = splitBookDetailsString(string)

  return bookDetails.title
    ? {
        slug: getBookSlug(bookDetails),
        ...bookDetails,
      }
    : {}
}
