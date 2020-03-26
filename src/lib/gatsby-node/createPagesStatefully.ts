import { resolve } from 'path'

import PAGES from 'routes'
import { normalizeArray } from 'utils/graphql/normalize'

interface Video {
  id: string
  slug: string
}

interface Book {
  id: string
  slug: string
}

export const createPagesStatefully = async ({
  graphql,
  actions,
  reporter,
}): Promise<boolean> => {
  const { createPage } = actions

  const {
    data: { allVideo: videoData, allBook: bookData },
  } = await graphql(`
    query {
      allVideo {
        edges {
          node {
            id
            slug
          }
        }
      }
      allBook {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  const videos = normalizeArray(videoData) as Video[]
  const books = normalizeArray(bookData) as Book[]

  /**
   * Video pages
   */

  const videoPageActivity = reporter.activityTimer('create video pages')
  videoPageActivity.start()
  videos.forEach((video) => {
    const { slug, id } = video
    createPage({
      path: slug,
      component: resolve(`./src/views/${PAGES.VIDEO.VIEW}/index.tsx`),
      context: {
        id,
      },
    })
  })
  videoPageActivity.end()

  /**
   * Book pages
   */

  const bookPageActivity = reporter.activityTimer('create book pages')
  bookPageActivity.start()
  books.forEach((book) => {
    const { slug, id } = book
    createPage({
      path: slug,
      component: resolve(`./src/views/${PAGES.BOOK.VIEW}/index.tsx`),
      context: {
        id,
      },
    })
  })
  bookPageActivity.end()

  /**
   * Flat pages
   */
  type PagesAsEntries = [string, { PATH: string; VIEW: string }]
  Object.entries(PAGES).forEach(([PAGE, { PATH, VIEW }]: PagesAsEntries) => {
    if (['BOOK', 'VIDEO'].includes(PAGE)) return

    const activity = reporter.activityTimer(`createPage ${PATH}`)
    activity.start()
    createPage({
      path: PATH,
      component: resolve(`./src/views/${VIEW}/index.tsx`),
    })
    activity.end()
  })

  return true
}
