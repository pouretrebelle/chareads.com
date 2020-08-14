import { YoutubeVideo } from '../types'
import getBookFromString from './getBookFromString'
import getTitle from './getTitle'

const getOwnedBy = (video: YoutubeVideo): string =>
  getBookFromString(getTitle(video))

export default getOwnedBy
