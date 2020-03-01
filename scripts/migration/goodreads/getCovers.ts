import https from 'https'

import { BookIntermediary } from './types'
import { downloadFile } from '../writeFile'

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

export const downloadBookCover = async (
  book: BookIntermediary,
  folder: string,
  fileName: string
): Promise<void> => {
  const url = book.image

  if (
    url ===
    'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'
  ) {
    return downloadBookDepositoryImage(book, folder, 'cover.jpg')
  }

  const fullSizeUrl = url.replace(/_S[XY]\d+_\.jpg$/, '_SY475_.jpg')

  return await downloadFile(fullSizeUrl, folder, fileName)
}
