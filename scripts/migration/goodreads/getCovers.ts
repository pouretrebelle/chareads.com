import https from 'https'

import { BookIntermediary } from './types'
import { downloadFile } from '../writeFile'

export const downloadGoodreadsImage = async (
  book: BookIntermediary,
  folder: string,
  fileName: string
): Promise<void> => {
  return await downloadFile(book.image, folder, fileName)
}

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
