import csv from 'csv-parser'
import fs from 'fs'
import prettier from 'prettier'
import dotenv from 'dotenv'
dotenv.config()

import { TbrBook } from 'types/book'

import { writeFile } from '../utils'

import { GoodreadsBook } from './goodreads/types'
import { camelCase } from './goodreads/utils/common'
import destructTitle from './goodreads/utils/destructTitle'
import { getIsbn13 } from './goodreads/utils/getIsbn'

const TBR_SHELVES = [
  'currently-reading',
  'to-read',
  'to-listen',
  'to-buy',
  'dusty',
  'unfinished',
]

const syncTbr = async (): Promise<void> => {
  const bookData: GoodreadsBook[] = []
  fs.createReadStream('goodreads-data.csv')
    .pipe(
      csv({
        mapHeaders: ({ header }: { header: string }) => camelCase(header),
      })
    )
    .on('data', (data) => bookData.push(data))
    .on('end', () => {
      bookData.sort((a, b) => +new Date(b.dateAdded) - +new Date(a.dateAdded))
      const structuredGoodreadsData = bookData
        .filter((book) => TBR_SHELVES.includes(book.exclusiveShelf))
        .map(
          (book: GoodreadsBook): TbrBook =>
            getIsbn13(book)
              ? {
                  ...destructTitle(book.title),
                  author: book.author,
                  isbn13: getIsbn13(book),
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
    })
}

syncTbr()
