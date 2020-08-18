import axios from 'axios'
import prettier from 'prettier'
import parser from 'fast-xml-parser'
import dotenv from 'dotenv'
dotenv.config()

import { TbrBook } from 'types/book'

import { writeFile } from '../utils'

import getAuthor from './goodreads/utils/getAuthor'
import destructTitle from './goodreads/utils/destructTitle'
import { normalizeArray } from './goodreads/utils/common'
import { GoodreadsReview } from './goodreads/types'

const TBR_SHELVES = [
  'currently-reading',
  'to-read',
  'to-listen',
  'to-buy',
  'dusty',
  'unfinished',
]

const syncTbr = async (): Promise<void> => {
  const bookData: GoodreadsReview[] = []

  await Promise.all(
    TBR_SHELVES.map((shelf) =>
      axios.get(
        `https://www.goodreads.com/review/list/5008298.xml?v=2&sort=date_read&shelf=${shelf}&key=${process.env.GOODREADS_API_TOKEN}&per_page=200`
      )
    )
  ).then((responses) => {
    responses.forEach((res) => {
      const jsonObj = parser.parse(res.data, {
        ignoreAttributes: false,
        attributeNamePrefix: '',
      })

      bookData.push(
        ...normalizeArray<GoodreadsReview>(
          jsonObj.GoodreadsResponse.reviews.review
        )
      )
    })
  })

  const structuredGoodreadsData = bookData
    .map(
      (review: GoodreadsReview): TbrBook =>
        typeof review.book.isbn13 === 'number'
          ? {
              ...destructTitle(review.book.title),
              author: getAuthor(review),
              isbn13: String(review.book.isbn13),
            }
          : null
    )
    .filter((b) => !!b)

  writeFile(
    'content/books',
    'tbr.ts',
    prettier.format(
      `export const TBR_BOOKS = ${JSON.stringify(structuredGoodreadsData)}`,
      {
        parser: 'babel',
        semi: false,
        singleQuote: true,
        trailingComma: 'es5',
      }
    )
  )
}

syncTbr()
