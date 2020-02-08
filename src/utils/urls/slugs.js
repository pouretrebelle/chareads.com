import slugify from 'slugify'
import PAGES from 'routes'

const slugifyOptions = {
  lower: true,
  remove: /[^A-Za-z0-9_\- ]/g,
}

const wasteWords = ['by', 'the', 'in', 'on', 'at', 'to', 'a', 'is', 'and']

export const getBookSlug = ({ title, author }) => {
  const slug = slugify(`${title} ${author}`, slugifyOptions)
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

  const slug = slugify(`${yearAndMonth} ${slimmedTitle}`, slugifyOptions)
  return `${PAGES.VIDEO.PATH}/${slug}`
}
