// data derived from https://glitch.com/edit/#!/goodreads-stats-basic?path=helpers.js:7:76
import goodreadsData from './data/goodreads'
import { GoodreadsBook, BookIntermediary } from './goodreads/types'

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
import getFolder from './goodreads/utils/getFolder'
import getTags from './goodreads/utils/getTags'

export const structuredGoodreadsData = goodreadsData.map(
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
