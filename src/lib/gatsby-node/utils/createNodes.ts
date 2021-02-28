import { createContentDigest } from 'gatsby-core-utils'

import allYouTubeStats from 'youTubeStats'
import { makeIsbn10, makeIsbn13 } from 'utils/formatting/isbn'
import { getBookSlug, getVideoSlug } from 'utils/urls/slugs'
import { getAffiliateLinks } from 'utils/urls/affiliates'
import { Book } from 'types/book'
import { getLastReadDate, getSortingDate } from 'utils/formatting/time'

export const createBookNode = ({ node, createNode }): void => {
  const { frontmatter, ...content } = node

  const isbn10 = makeIsbn10(node.frontmatter.isbn13 || node.frontmatter.isbn10)
  const isbn13 = makeIsbn13(node.frontmatter.isbn10 || node.frontmatter.isbn13)
  const dateLastRead = getLastReadDate(node.frontmatter.readDates)
  const sortingDate = getSortingDate(
    node.frontmatter.readDates,
    node.frontmatter.series?.title
  )

  const data = {
    ...frontmatter,
    ...content,
    slug: getBookSlug(node.frontmatter),
    isbn10,
    isbn13,
    dateLastRead,
    sortingDate,
    links: getAffiliateLinks(isbn13 || isbn10),
  } as Book

  createNode({
    ...data,
    id: `${node.id}-book`,
    internal: {
      type: 'Book',
      content: node.rawMarkdownBody,
      contentDigest: createContentDigest(node),
    },
  })
}

export const createVideoNode = ({ node, createNode }): void => {
  const { frontmatter, ...content } = node

  const youTubeStats = allYouTubeStats[node.frontmatter.youtubeId]

  createNode({
    ...frontmatter,
    ...content,
    ...youTubeStats,
    slug: getVideoSlug(node.frontmatter),

    id: `${node.id}-video`,
    internal: {
      type: 'Video',
      content: node.rawMarkdownBody,
      contentDigest: createContentDigest(node),
    },
  })
}
