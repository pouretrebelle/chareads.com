import { GoodreadsBook } from '../types'

import youtubeData from '../../data/youtube'
import getYouTubeRatings from '../../youtube/ratings'
import { YoutubeVideo } from '../../youtube/types'

const youTubeRatingMap = Object.assign(
  {},
  ...youtubeData.map((video: YoutubeVideo) => getYouTubeRatings(video))
)

export const getRating5 = (book: GoodreadsBook): number =>
  book.review.rating ? book.review.rating : undefined

export const getRating7 = (book: GoodreadsBook): number => {
  const [fullTitle, shortTitle] = book.title.match(
    /^(.+?)(?:: .+)?(?: \(.+\))?$/
  )
  const shortName = `${shortTitle}, ${book.author}`.toLowerCase()
  const fullName = `${fullTitle}, ${book.author}`.toLowerCase()
  return youTubeRatingMap[shortName] || youTubeRatingMap[fullName] || undefined
}
