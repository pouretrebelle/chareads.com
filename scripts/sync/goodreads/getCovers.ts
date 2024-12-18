import https from 'https'
import axios from 'axios'
import * as cheerio from 'cheerio'

import { BookIntermediary } from './types'
import { downloadFile } from '../../utils'

const downloadBookDepositoryImageSearch = (
  book: BookIntermediary,
  folder: string,
  fileName: string
): void => {
  https.get(
    `https://www.bookdepository.com/search?searchTerm=${book.title} ${book.author}`,
    (res) => {
      res.setEncoding('utf8')
      let body = ''
      res.on('data', (data) => {
        body += data
      })
      res.on('end', () => {
        const matches = body.match(/<img class="lazy" data-lazy="([^"]+)"/)
        if (!matches) return
        downloadFile(matches[1].replace(/\/mid\//, '/lrg/'), folder, fileName)
      })
    }
  )
}

export const downloadBookDepositoryImage = (
  book: BookIntermediary,
  folder: string,
  fileName: string
): void => {
  if (!book.isbn13)
    return downloadBookDepositoryImageSearch(book, folder, fileName)

  https.get(
    `https://www.bookdepository.com/search?searchTerm=${book.isbn13}`,
    (baseRes) => {
      // isbn searches should always 301 to book pages
      if (baseRes.statusCode !== 301)
        return downloadBookDepositoryImageSearch(book, folder, fileName)

      https.get(
        `https://www.bookdepository.com/${baseRes.headers.location}`,
        (res): void => {
          res.setEncoding('utf8')
          let body = ''
          res.on('data', (data) => {
            body += data
          })
          res.on('end', () => {
            const matches = body.match(
              /<img src="([^"]+)" (alt=".+" )?class="book-img" itemprop="image" \/>/
            )
            if (!matches) {
              return downloadBookDepositoryImageSearch(book, folder, fileName)
            }
            downloadFile(matches[1], folder, fileName)
          })
        }
      )
    }
  )
}

export const downloadAmazonImage = (
  book: BookIntermediary,
  folder: string,
  fileName: string
): void => {

  const searchTerm = book.isbn13 || `${book.title} ${book.author}`

  axios.get(`https://www.amazon.co.uk/s?k=${searchTerm}`).then(res => {
    const $ = cheerio.load(res.data);

    const image = $('img.s-image')

    if (!image || !image.attr('srcset')) {
      console.log(`No image found for ${book.title} by ${book.author}`)
      return null
    }

    const matches = image.attr('srcset').match(
      /2\.5x, ([^ ]+) 3x/
    )
    if (!matches) return null
    downloadFile(matches[1], folder, fileName)
  })

  return null
}

export const downloadBookCover = async (
  book: BookIntermediary,
  folder: string
): Promise<void> => downloadAmazonImage(book, folder, 'cover.jpg')
