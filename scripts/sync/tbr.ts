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

const syncTbr = async (): Promise<void> => {
  const res = await axios.get(
    `https://www.goodreads.com/review/list/5008298.xml?v=2&sort=date_read&shelf=to-read&key=${process.env.GOODREADS_API_TOKEN}&per_page=200`
  )
  const jsonObj = parser.parse(res.data, {
    ignoreAttributes: false,
    attributeNamePrefix: '',
  })

  const bookData = normalizeArray<GoodreadsReview>(
    jsonObj.GoodreadsResponse.reviews.review
  )

  const structuredGoodreadsData = bookData.map(
    (review: GoodreadsReview): TbrBook => ({
      ...destructTitle(review.book.title),
      author: getAuthor(review),
      isbn13: review.book.isbn13
        ? String(review.book.isbn13)
        : review.book.isbn
        ? String(review.book.isbn)
        : undefined,
    })
  )

  writeFile(
    'content/books',
    'tbr.ts',
    prettier.format(
      `/* eslint-disable */

    export default ${JSON.stringify(structuredGoodreadsData)}`,
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
