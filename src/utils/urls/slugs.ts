import slugify from 'slugify'

import PAGES from 'routes'
import { Book } from 'types/book'
import { Video } from 'types/video'

const slugifyOptions = {
  lower: true,
  remove: /[^A-Za-z0-9_\- ]/g,
}

const wasteWords = ['by', 'the', 'in', 'on', 'at', 'to', 'a', 'is', 'and']

export const getBookSlug = ({
  title,
  author,
}: Pick<Book, 'title' | 'author'>): string => {
  const slug = slugify(`${title} ${author}`, slugifyOptions)
  return `${PAGES.BOOK.PATH}${slug}/`
}

export const getVideoSlug = ({
  title,
  datePublished,
}: Pick<Video, 'title' | 'datePublished'>): string => {
  const slimmedTitle = title
    .toLowerCase()
    .split(' ')
    .filter((w) => !wasteWords.includes(w))
    .slice(0, 6)
    .join(' ')
  const yearAndMonth = new Date(datePublished).toISOString().slice(0, 8)

  const slug = slugify(`${yearAndMonth} ${slimmedTitle}`, slugifyOptions)
  return `${PAGES.VIDEO.PATH}${slug}/`
}

export const getImageSlug = ({ relativePath, sourceInstanceName }: { relativePath: string, sourceInstanceName: string }): string => {
  const staticPath = relativePath.split('.')[0].replaceAll(/\//g, '-')

  const slug = slugify(`${sourceInstanceName}-${staticPath}`, slugifyOptions)

  return slug
}
