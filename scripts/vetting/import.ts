import fs from 'fs'
import csvParse from 'csv-parse/lib/sync'
import dotenv from 'dotenv'

dotenv.config()

import { walk, readFileAsync, writeFile, downloadFile } from '../utils'

interface SheetRow {
  dateRated: string
  title: string
  author: string
  publisher: string
  oldImage: string
  image: string
  isbn13: string
  dateBookPublished: string
  notes: string
}

// csv exported from https://docs.google.com/spreadsheets/d/1WjrFgPxflRZ4YGHzZHZ8nKXchsqTz68uvHMbyxhqK3I

const input = fs.readFileSync('scripts/vetting/data/import.csv')
const rows = csvParse(input, {
  columns: true,
  skip_empty_lines: true, // eslint-disable-line @typescript-eslint/camelcase
}) as SheetRow[]

walk('content/books', async (err, files) => {
  if (err) return console.error(err)

  const ymlFiles = files.filter((file) => file.match(/\.md$/))

  await Promise.all(
    ymlFiles.map((file) =>
      readFileAsync(file)
        .then(async (text) => {
          const [titleMatch, title] = text.match(/title: (.+)\n/) // eslint-disable-line
          const [authorMatch, author] = text.match(/author: (.+)\n/) // eslint-disable-line

          const row = rows.find(
            (row: SheetRow) => row.title === title && row.author === author
          ) as SheetRow

          if (!row) return

          let newText = text
            .replace(/publisher:\n/, `publisher: ${row.publisher}\n`)
            .replace(
              /dateBookPublished:.+\n/,
              `dateBookPublished: ${row.dateBookPublished}\n`
            )
          if (!text.match(/dateBookPublished:/)) {
            newText = newText.replace(
              /(image: cover.jpg\n)/,
              `$1dateBookPublished: ${row.dateBookPublished}\n`
            )
          }
          if (!text.match(/isbn13:/)) {
            newText = newText.replace(
              /(goodreadsReviewId: .+\n)/,
              `$1isbn13: ${row.isbn13}\n`
            )
          }

          const folder = file.slice(0, -9) // get rid of /index.md

          writeFile(folder, 'index.md', newText)
          downloadFile(row.image, folder, 'cover.jpg')
        })
        .catch((err) => console.error(err))
    )
  )
})
