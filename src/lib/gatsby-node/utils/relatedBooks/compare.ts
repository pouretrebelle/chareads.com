import { Book } from 'types/book'
import dayjs from 'dayjs'

export const DATE_MATCH_MAX_POINTS = 1.5
const TAG_PREFIX_POINTS = {
  genre: 2,
  sub: 2,
  pub: 1,
  type: 1,
}

export const getYearsBetweenDates = (a: Date, b: Date): number => {
  const aDate = dayjs(a)
  const bDate = dayjs(b)
  return Math.abs(
    aDate.year() - bDate.year() + (aDate.month() - bDate.month()) / 12
  )
}

export const getSpanOfInfluence = (
  publicationDate: Date,
  currentDate: Date
): number => {
  const timeAgo = getYearsBetweenDates(publicationDate, currentDate)

  return 5 + 2 * Math.pow(5, Math.log10(timeAgo))
}

export const compareBooks = (
  a: Book,
  b: Book,
  currentDate: Date = new Date()
): number => {
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

  if (a.dateBookPublished && b.dateBookPublished) {
    const span = getSpanOfInfluence(a.dateBookPublished, currentDate)
    const dist = getYearsBetweenDates(a.dateBookPublished, b.dateBookPublished)
    if (dist < span) {
      points += DATE_MATCH_MAX_POINTS - (DATE_MATCH_MAX_POINTS * dist) / span
    }
  }

  return points
}
