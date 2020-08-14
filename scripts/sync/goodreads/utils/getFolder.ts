import slugify from 'slugify'
import { getReadDates } from './dates'
import { GoodreadsBook } from '../types'
import destructTitle from './destructTitle'

const wasteWords = ['by', 'the', 'in', 'on', 'at', 'to', 'a', 'is', 'and']

const getFolder = (book: GoodreadsBook): string => {
  const [year, month, day] = getReadDates(book)[0][1].split('-')

  const title = destructTitle(book.title)
    .title.toLowerCase()
    .split(' ')
    .filter((w) => !wasteWords.includes(w))
    .slice(0, 6)
    .join(' ')
  const folder = slugify(`${day} ${title}`, {
    lower: true,
    remove: /[^A-Za-z0-9_\- ]/g,
  })

  return `${year}/${month}/${folder}`
}

export default getFolder
