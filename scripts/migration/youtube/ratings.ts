import { YoutubeVideo } from './types'
import getBookFromString from './utils/getBookFromString'
import getOwnedBy from './utils/getOwnedBy'

const getStarsFromString = (string: string): number =>
  string.split('').reduce((acc, cur) => (cur === '★' ? acc + 1 : acc), 0)

const getRatingsFromMatches = (
  matches: object[],
  indexOfTitle: number,
  indexOfRating: number
): object =>
  Object.assign(
    {},
    ...matches.map((match) => {
      const title = getBookFromString(match[indexOfTitle])
      if (!title) return {}
      return {
        [title.toLowerCase()]: getStarsFromString(match[indexOfRating]),
      }
    })
  )

const getRatings = (video: YoutubeVideo): object => {
  const scanText = video.snippet.description.replace(/\\n/g, '\n')

  const ownedBy = getOwnedBy(video)
  if (ownedBy) {
    const matches = scanText.match(/[★|✭☆]{7,}/)
    if (!matches) return {}
    return { [ownedBy.toLowerCase()]: getStarsFromString(matches[0]) }
  }

  const beforeMatches = [
    ...scanText.matchAll(/([★|✭☆]{7,})\n(?:\d+:\d+ )(.+)\n/gm),
  ]
  if (beforeMatches.length) {
    return getRatingsFromMatches(beforeMatches, 2, 1)
  }

  const afterMatches = [
    ...scanText.matchAll(/(?:\d+:\d+ )(.+)\n([★|✭☆]{7,})\n/gm),
  ]
  if (afterMatches.length) {
    return getRatingsFromMatches(afterMatches, 1, 2)
  }
}

export default getRatings
