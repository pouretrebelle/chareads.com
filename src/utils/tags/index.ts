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

export const splitTagByPrefix = (tag: string): [string, string, string] => {
  const parts = tag.split('-')
  return [parts[0], parts.slice(1).join('-'), tag]
}

export const splitTagsByPrefix = (
  tags: string[]
): {
  prefix: string
  values: {
    name: string
    unprefixed: string
  }[]
}[] => {
  const resultMap = tags
    .map(splitTagByPrefix)
    .reduce((prev, [prefix, name, unprefixed]) => {
      const value = { name, unprefixed }
      if (prev[prefix]) {
        prev[prefix].push(value)
      } else {
        prev[prefix] = [value]
      }
      return prev
    }, {})

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
