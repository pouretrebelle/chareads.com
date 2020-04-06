import path from 'path'
import { normalizeArray } from 'utils/graphql/normalize'
import { createBookShareImage, ShareBook } from './utils/shareImage'

const publicPath = './public'

export const onPostBuild = async ({ graphql, reporter }): Promise<void> => {
  const bookShareImageActivity = reporter.activityTimer(
    'create book share images'
  )
  bookShareImageActivity.start()

  const { data } = await graphql(`
    {
      allBook {
        edges {
          node {
            slug
            image {
              relativePath
              colors {
                muted
              }
            }
          }
        }
      }
    }
  `)

  const books = normalizeArray(data.allBook) as ShareBook[]

  await Promise.all(
    books.map(
      (book): Promise<void> => {
        const imagePath = path.join(publicPath, `${book.slug}/share.jpg`)
        return createBookShareImage(book, imagePath)
      }
    )
  )

  bookShareImageActivity.end()
}
