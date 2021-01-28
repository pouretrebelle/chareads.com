import csv from 'csv-parser'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

import { writeFile } from '../utils'
import { BookIntermediary, GoodreadsBook } from './goodreads/types'
import bookTemplate from './templates/book'
import { downloadBookCover } from './goodreads/getCovers'

import getBookPublisher from './goodreads/utils/getBookPublisher'
import getBookHeight from './goodreads/utils/getBookHeight'
import destructTitle from './goodreads/utils/destructTitle'
import {
  getReadDates,
  getDateRated,
  getDateReviewed,
} from './goodreads/utils/dates'
import { getRating5 } from './goodreads/utils/getRatings'
import getTags from './goodreads/utils/getTags'
import getFolder from './goodreads/utils/getFolder'
import getReview from './goodreads/utils/getReview'

const BOOK_COUNT = process.argv[2] || '1'

const syncBooks = async (): Promise<void> => {
  const allBookData: GoodreadsBook[] = []
  fs.createReadStream('goodreads-data.csv')
    .pipe(
      csv({
        mapHeaders: ({ header }: { header: string }) =>
          header
            .toLowerCase()
            .replace(/\s+(.)/g, (match, group) => group.toUpperCase()),
      })
    )
    .on('data', (data) => allBookData.push(data))
    .on('end', () => {
      allBookData.sort((a, b) => {
        if (b.dateRead === '') return -1
        return +new Date(b.dateRead) - +new Date(a.dateRead)
      })
      const bookData = allBookData.slice(0, parseInt(BOOK_COUNT, 10))

      const structuredGoodreadsData = bookData.map(
        (book: GoodreadsBook): BookIntermediary => ({
          ...destructTitle(book.title),
          author: book.author,
          publisher: getBookPublisher(book),
          dateBookPublished: `${book.originalPublicationYear}-01-01`,
          pageCount: parseInt(book.numberOfPages, 10),
          isbn13: book.isbn13.slice(2, 15),
          rating5: getRating5(book),
          readDates: getReadDates(book),
          dateRated: getDateRated(book),
          dateReviewed: getDateReviewed(book),
          tags: getTags(book),
          bookHeight: getBookHeight(book),
          review: getReview(book),
          folder: getFolder(book),
        })
      )

      structuredGoodreadsData.forEach(async (book: BookIntermediary) => {
        const folder = `content/books/${book.folder}`

        writeFile(folder, 'index.md', bookTemplate(book))

        await downloadBookCover(book, folder)
      })
    })
}

syncBooks()
