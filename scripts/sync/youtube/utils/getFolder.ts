import slugify from 'slugify'
import getTitle from './getTitle'
import { YoutubeVideo } from '../types'

const wasteWords = ['by', 'the', 'in', 'on', 'at', 'to', 'a', 'is', 'and']

const getFolder = (video: YoutubeVideo): string => {
  const publishDate = video.snippet.publishedAt.slice(0, 10)
  const [year, month, day] = publishDate.split('-')

  const title = getTitle(video)
    .toLowerCase()
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
