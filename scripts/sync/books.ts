import { writeFile } from '../utils'
import goodreadsData from './data/goodreads'
import { GoodreadsBook, BookIntermediary } from './goodreads/types'
import bookTemplate from './templates/book'
import { downloadBookCover } from './goodreads/getCovers'

import { getRating5, getRating7 } from './goodreads/utils/getRatings'
import getBookPublisher from './goodreads/utils/getBookPublisher'
import getBookHeight from './goodreads/utils/getBookHeight'
import destructTitle from './goodreads/utils/destructTitle'
import {
  getReadDates,
  getDateRated,
  getDateReviewed,
  getDateBookPublished,
} from './goodreads/utils/dates'
import sanitizeHtml from './goodreads/utils/sanitizeHtml'
import getGoodreadsReviewId from './goodreads/utils/getGoodreadsReviewId'
import getTags from './goodreads/utils/getTags'
import getFolder from './goodreads/utils/getFolder'

const structuredGoodreadsData = goodreadsData.map(
  (book: GoodreadsBook): BookIntermediary => ({
    author: book.author,
    publisher: getBookPublisher(book),
    dateBookPublished: getDateBookPublished(book),
    pageCount: book.pageCount,
    isbn13: book.isbn13 ? (book.isbn13 as string) : undefined,
    summary: sanitizeHtml(book.description),
    rating5: getRating5(book),
    rating7: getRating7(book),
    readDates: getReadDates(book),
    dateRated: getDateRated(book),
    dateReviewed: getDateReviewed(book),
    tags: getTags(book),
    goodreadsReviewId: getGoodreadsReviewId(book),
    bookHeight: getBookHeight(book),
    review: sanitizeHtml(book.review.body as string),
    ...destructTitle(book.title),
    folder: getFolder(book),
    image: book.imageUrl,
  })
)

structuredGoodreadsData.forEach(async (book: BookIntermediary) => {
  const folder = `content/books/${book.folder}`

  writeFile(folder, 'index.md', bookTemplate(book))

  await downloadBookCover(book, folder, 'cover.jpg')
})
