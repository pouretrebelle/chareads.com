import { resolve } from 'path'

import PAGES from 'routes'
import { normalizeArray } from 'utils/graphql/normalize'
import { getBookSlug } from 'utils/urls/slugs'
import { structureBookDetails } from 'utils/transformers/text'

export const createPagesStatefully = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const {
    data: { allVideos: videoData, allMarkdownRemark: bookData },
  } = await graphql(`
    query {
      allVideos {
        edges {
          node {
            title
            ownedBy
            id
            fields {
              slug
              timestamps {
                reference {
                  author
                  title
                }
              }
            }
          }
        }
      }
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              author
            }
          }
        }
      }
    }
  `)

  const videos = normalizeArray(videoData)
  const books = normalizeArray(bookData).map((book) => ({
    ...book,
    videoFeatures: [],
  }))

  /**
   * Video pages
   */

  videos.forEach((video) => {
    const { slug, timestamps, ownedBy } = video

    const bookSlugs = timestamps
      .filter((t) => !!t.reference)
      .map((t) => getBookSlug(t.reference))

    // link main book to video
    if (ownedBy) {
      const mainBookDetails = structureBookDetails(ownedBy)
      const mainBook = books.find((book) => book.slug === mainBookDetails.slug)

      if (mainBook) {
        mainBook.videoFeatures.push({
          primary: true,
          slug,
        })
      }
    }

    // link books to videos
    timestamps
      .filter((t) => !!t.reference)
      .forEach(({ reference, ...timestampData }) => {
        const referencedBook = books.find(
          (book) => book.slug === reference.slug
        )
        if (!referencedBook) return

        referencedBook.videoFeatures.push({
          primary: false,
          slug,
          ...timestampData,
        })
      })

    const pageContext = {
      slug,
      bookSlugs,
    }

    const activity = reporter.activityTimer(`createPage ${slug}`)
    activity.start()
    createPage({
      path: slug,
      component: resolve(`./src/views/${PAGES.VIDEO.VIEW}/index.js`),
      context: pageContext,
    })
    activity.end()
  })

  /**
   * Book pages
   */

  books.forEach((book) => {
    const { slug, videoFeatures } = book

    const pageContext = {
      slug,
      videoFeatures,
      videoFeatureSlugs: videoFeatures.map((m) => m.slug),
    }

    const activity = reporter.activityTimer(`createPage ${slug}`)
    activity.start()
    createPage({
      path: slug,
      component: resolve(`./src/views/${PAGES.BOOK.VIEW}/index.js`),
      context: pageContext,
    })
    activity.end()
  })

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
      component: resolve(`./src/views/${VIEW}/index.js`),
    })
    activity.end()
  })
}
