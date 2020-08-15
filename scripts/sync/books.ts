import axios from 'axios'
import parser from 'fast-xml-parser'
import dotenv from 'dotenv'
dotenv.config()

import { writeFile } from '../utils'
import { BookIntermediary, GoodreadsReview } from './goodreads/types'
import bookTemplate from './templates/book'
import { downloadBookCover } from './goodreads/getCovers'

import getAuthor from './goodreads/utils/getAuthor'
import { getRating5 } from './goodreads/utils/getRatings'
import getBookPublisher from './goodreads/utils/getBookPublisher'
import getBookHeight from './goodreads/utils/getBookHeight'
import destructTitle from './goodreads/utils/destructTitle'
import {
  getReadDates,
  getDateRated,
  getDateReviewed,
  getDateBookPublished,
} from './goodreads/utils/dates'
import { sanitizeHtml, normalizeArray } from './goodreads/utils/common'
import getTags from './goodreads/utils/getTags'
import getFolder from './goodreads/utils/getFolder'
import getReview from './goodreads/utils/getReview'

const BOOK_COUNT = process.argv[2] || 1

const syncBooks = async (): Promise<void> => {
  const res = await axios.get(
    `https://www.goodreads.com/review/list/5008298.xml?v=2&sort=date_read&shelf=read&key=${process.env.GOODREADS_API_TOKEN}&per_page=${BOOK_COUNT}`
  )
  const jsonObj = parser.parse(res.data, {
    ignoreAttributes: false,
    attributeNamePrefix: '',
  })

  const bookData = normalizeArray<GoodreadsReview>(
    jsonObj.GoodreadsResponse.reviews.review
  )

  const structuredGoodreadsData = bookData.map(
    (review: GoodreadsReview): BookIntermediary => ({
      ...destructTitle(review.book.title),
      author: getAuthor(review),
      publisher: getBookPublisher(review),
      dateBookPublished: getDateBookPublished(review),
      pageCount: review.book.num_pages,
      isbn13: String(review.book.isbn13 || review.book.isbn),
      summary: sanitizeHtml(review.book.description),
      rating5: getRating5(review),
      readDates: getReadDates(review),
      dateRated: getDateRated(review),
      dateReviewed: getDateReviewed(review),
      tags: getTags(review),
      goodreadsReviewId: review.id,
      bookHeight: getBookHeight(review),
      review: getReview(review),
      folder: getFolder(review),
      image: review.book.image_url,
    })
  )

  structuredGoodreadsData.forEach(async (book: BookIntermediary) => {
    const folder = `content/books/${book.folder}`

    writeFile(folder, 'index.md', bookTemplate(book))

    await downloadBookCover(book, folder, 'cover.jpg')
  })
}

syncBooks()
