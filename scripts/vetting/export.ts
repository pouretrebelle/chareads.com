import YAML from 'yaml'
import csvStringify from 'csv-stringify/lib/sync'
import dayjs from 'dayjs'
import dotenv from 'dotenv'

dotenv.config()

import { walk, readFileAsync, writeFile } from '../utils'
import { Book } from 'types/book'
import { getBookSlug } from 'utils/urls/slugs'

const DATE_FORMAT = 'YYYY-MM-DD'

walk('content/books', async (err, files) => {
  if (err) return console.error(err)

  const ymlFiles = files.filter((file) => file.match(/\.md$/))

  const bookData = []

  await Promise.all(ymlFiles.map(readFileAsync))
    .then(async (files) => {
      files.map(async (text) => {
        const [match, frontmatter] = text.match(/---\n((.|\n)+)\n---/) // eslint-disable-line
        const data = (YAML.parse(frontmatter) || {}) as Book

        const {
          dateRated,
          title,
          author,
          publisher,
          isbn13,
          dateBookPublished,
          vetted,
        } = data
        const imagePath = `https://chareads.com${getBookSlug({
          title,
          author,
        })}share.jpg`

        const ratedDate = dayjs(dateRated).format(DATE_FORMAT)
        const publishDate = dayjs(dateBookPublished).format(DATE_FORMAT)

        if (!vetted)
          bookData.push({
            ratedDate,
            title,
            author,
            publisher,
            isbn13,
            publishDate,
            imagePath,
          })
      })
    })
    .catch((err) => console.error(err))

  writeFile('scripts/vetting/data', 'export.csv', csvStringify(bookData))
})
