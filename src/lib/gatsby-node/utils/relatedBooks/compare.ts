import { Book } from 'types/book'

const TAG_PREFIX_POINTS = {
  genre: 2,
  sub: 2,
  pub: 1,
  type: 1,
}

export const compareBooks = (a: Book, b: Book): number => {
  let points = 0

  if (a.author && b.author && a.author.toLowerCase() === b.author.toLowerCase())
    points += 3

  points += (b.tags || [])
    .filter((tag) => (a.tags || []).includes(tag))
    .map((tag) => {
      const matches = tag.match(/^([^-]+)/)

      return matches ? TAG_PREFIX_POINTS[matches[1]] || 0 : 0
    })
    .reduce((acc, cur) => acc + cur, 0)

  return points
}
