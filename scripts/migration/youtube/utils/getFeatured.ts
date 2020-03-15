import getTitle from './getTitle'
import { YoutubeVideo } from '../types'

const featuredTitles = [
  'Naked Hardbacks',
  'A Confederacy of Dunces by John Kennedy Toole',
  'Flowers For Algernon by Daniel Keyes',
  'J. D. Salinger: For Esme with Love and Squalor, Raise High the Roof Beam, Seymour: An Introduction',
  'Frankenstein by Mary Shelley',
  'Kafka On The Shore by Haruki Murakami',
  'We Who Are About To... by Joanna Russ',
  'Living without Language | Ella Minnow Pea by Mark Dunn',
  '7 Podcast Recommendations',
  'My All-Time Favourite Books',
  'The Spy And The Traitor by Ben Macintyre',
  'Conversations With Friends by Sally Rooney',
  'Pachinko by Min Jin Lee',
]

const getFeatured = (video: YoutubeVideo): boolean =>
  featuredTitles.includes(getTitle(video))

export default getFeatured
