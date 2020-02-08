import slugify from 'slugify'
import PAGES from 'routes'

const wasteWords = ['by', 'the', 'in', 'on', 'at', 'to', 'a', 'is', 'and']

export const getBookSlug = ({ title, author }) => {
  const slug = slugify(`${title} ${author}`, { lower: true })
  return `${PAGES.BOOK.PATH}/${slug}`
}

export const getVideoSlug = ({ title, datePublished }) => {
  const slimmedTitle = title
    .toLowerCase()
    .split(' ')
    .filter((w) => !wasteWords.includes(w))
    .slice(0, 6)
    .join(' ')
  const yearAndMonth = datePublished.toISOString().slice(0, 8)

  const slug = slugify(`${yearAndMonth} ${slimmedTitle}`, {
    lower: true,
  })
  return `${PAGES.VIDEO.PATH}/${slug}`
}
