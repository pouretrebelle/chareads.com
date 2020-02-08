import { getBookSlug } from 'utils/urls/slugs'

export const structureBookDetails = (string) => {
  const bookDetails = splitBookDetailsString(string)

  return bookDetails.title
    ? {
        slug: getBookSlug(bookDetails),
        ...bookDetails,
      }
    : {}
}

export const splitBookDetailsString = (string) => {
  const referenceMatch = string.match(/^(.+), (.+)$/)
  return referenceMatch
    ? {
        title: referenceMatch[1],
        author: referenceMatch[2],
      }
    : {}
}

export const formatBookDetails = ({ title, author }) => `${title} by ${author}`
