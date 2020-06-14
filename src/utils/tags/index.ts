import { sortAlphabetically } from 'utils/formatting/text'

export type TagPrefix = 'type' | 'genre' | 'sub'

const tagPrefixNames = {
  type: 'Type',
  genre: 'Genre',
  sub: 'Subject',
}

export interface BookWithTags {
  tags: string[]
}

export const splitTagsByPrefix = (
  tags: string[]
): {
  prefix: string
  values: string[]
}[] => {
  const resultMap = {}

  tags.forEach((tag) => {
    const parts = tag.split('-')
    if (parts.length === 1) return

    const prefix = parts[0]

    const value = parts.slice(1).join('-')

    if (!resultMap[prefix]) return (resultMap[prefix] = [value])

    resultMap[prefix].push(value)
  })

  return Object.keys(tagPrefixNames)
    .filter((p) => resultMap[p])
    .map((prefix) => ({
      prefix: tagPrefixNames[prefix],
      values: resultMap[prefix],
    }))
}

export const getTagsFromBooks = (
  books: BookWithTags[],
  prefix?: TagPrefix
): string[] => {
  const tags = []
  books.forEach((b) => tags.push(...b.tags))
  const dedupedTags = [...new Set(tags)]
  const orderedTags = sortAlphabetically(dedupedTags)

  if (!prefix) return orderedTags

  return orderedTags
    .filter((tag) => tag.startsWith(`${prefix}-`))
    .map((tag) => tag.slice(prefix.length + 1))
}

export const filterBooksByTags = (
  books: BookWithTags[],
  filterType?: string,
  filterGenre?: string,
  filterSubjects?: string[],
  ignorePrefix?: TagPrefix
): BookWithTags[] => {
  let filteredBooks = books
  if (filterType && ignorePrefix !== 'type')
    filteredBooks = filteredBooks.filter((book) =>
      book.tags.includes(`type-${filterType}`)
    )
  if (filterGenre && ignorePrefix !== 'genre')
    filteredBooks = filteredBooks.filter((book) =>
      book.tags.includes(`genre-${filterGenre}`)
    )
  if (filterSubjects.length && ignorePrefix !== 'sub')
    filteredBooks = filteredBooks.filter((book) =>
      filterSubjects.some((tag) => book.tags.includes(`sub-${tag}`))
    )

  return filteredBooks
}
