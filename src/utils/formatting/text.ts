import { Book } from 'types/book'

export const getBookDetailsFromString = (
  text: string
): Pick<Book, 'title' | 'author'> | undefined => {
  const referenceMatch = text.match(/^(.+), (.+)$/)
  return (
    referenceMatch && {
      title: referenceMatch[1],
      author: referenceMatch[2],
    }
  )
}

export const formatBookDetails = ({
  title,
  author,
}: Pick<Book, 'title' | 'author'>): string => `${title} by ${author}`

export const stripHtml = (text: string): string =>
  text
    .replace(/<\/[^>]+><[^>/]+>/gm, ' ')
    .replace(/<\/?[^>]+>/g, '')
    .replace(/ +/gm, ' ')
    .trim()
